const express = require('express')
const { query } = require('../helpers/db.js')

const userRouter = express.Router()


userRouter.post("/login",async(req,res) => {
  try {
    const sql = "select * from account where email=$1"
    const result = await query(sql,[req.body.email])
    if (result.rowCount === 1) {

      if (result.rows[0].password === req.body.password) {
        res.status(200).json(result.rows[0])
      } else {
        res.statusMessage = 'Invalid login'
        res.status(401).json({error: 'Invalid login'})
      }
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
  try {
    const sql = "insert into account (email, password) values ($1,$2) returning id"
    const result = await query(sql,[req.body.email,req.body.password])
    res.status(200).json({id: result.rows[0].id}) 
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

module.exports = {
  userRouter
}