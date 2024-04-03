const express = require('express')
const { query } = require('../helpers/db.js')
const bcrypt = require('bcrypt')

const userRouter = express.Router()

userRouter.post("/login",async(req,res) => {
  try {
    const sql = "select * from account where email=$1"
    const result = await query(sql,[req.body.email])
    if (result.rowCount === 1) {
      bcrypt.compare(req.body.password,result.rows[0].password,(err,bcrypt_res) => {
        if (!err) {
          if (bcrypt_res === true) {
            const user = result.rows[0]
            res.status(200).json({"id":user.id,"email":user.email})
          } else {
            res.statusMessage = 'Invalid login'
            res.status(401).json({error: 'Invalid login'})
          }
        } else {
          res.statusMessage = err
          res.status(500).json({error: err})
        }
      })
    } else {
      res.statusMessage = 'Invalid login'
      res.status(401).json({error: 'Invalid login'})
    }
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

userRouter.post("/register",async(req,res) => {
    bcrypt.hash(req.body.password,10,async (err,hash) => {
      if (!err) {
        try {
          const sql = "insert into account (email, password) values ($1,$2) returning id"
          const result = await query(sql,[req.body.email,hash])
          res.status(200).json({id: result.rows[0].id}) 
        } catch (error) {
          res.statusMessage = error
          res.status(500).json({error: error})
        }
      } else {
        res.statusMessage = err
        res.status(500).json({error: err})
      }
    })
})

module.exports = {
  userRouter
}