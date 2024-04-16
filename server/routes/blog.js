const express = require('express')
const { query } = require('../helpers/db.js')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { auth } = require('../helpers/auth.js')

const blogRouter = express.Router()

blogRouter.get("/",async (req,res) => {
  try {
    const sql = `
    select post.id,post.title,post.message,post.image_name,post.saved,account.email,
    (select count(id) from comment where comment.post_id = post.id) as comment_count
        from post inner join account on post.account_id = account.id
    `
    const result = await query(sql)
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)
  } catch(error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

blogRouter.post("/new",auth,async(req,res) => {
  let file_name = ""
  try {
    if (req.files) {
      const file = req.files.image
      file_name = file.name
      const uploadPath = `./public/images/${file_name}`
      file.mv(uploadPath,(err) => {
        if (err) {
          throw new Error(err)
        }
      })
    }

    const sql = 'insert into post (title,message,image_name,account_id) values ($1,$2,$3,$4) returning *'
    const result = await query(sql,[req.body.title,req.body.message,file_name,req.body.account_id])
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

blogRouter.delete("/delete/:id",auth,async(req,res) => {
  const id = Number(req.params.id)
  try {
    const sql = 'delete from post where id = $1'
    await query(sql,[id])
    res.status(200).json({id:id})
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

blogRouter.get("/comments/:id",async(req,res) => {
  const post_id = Number(req.params.id)
  try {
    const sql = `
    select comment.id,comment.comment_text,comment.saved,account.email
    from comment inner join account
    on comment.account_id = account.id
    where comment.post_id = $1
    `
    const result = await query(sql,[post_id])
    const rows = result.rows ? result.rows : []
    res.status(200).json(rows)
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})



blogRouter.post("/comment",async(req,res) => {
  try {
    const sql = 'insert into comment (comment_text,post_id,account_id) values ($1,$2,$3) returning *'
    await query(sql,[req.body.comment,req.body.post_id,req.body.account_id])
    const result = await query('select count(id) as comment_count from comment where post_id = $1',[req.body.post_id])
    res.status(200).json(result.rows[0].comment_count)
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})


module.exports = {
  blogRouter
}