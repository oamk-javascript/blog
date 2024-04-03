const express = require('express')
const { query } = require('../helpers/db.js')

const blogRouter = express.Router()

blogRouter.get("/",async (req,res) => {
  try {
    const sql = `
    select post.id,post.title,post.message,post.saved,account.email 
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

blogRouter.post("/new",async(req,res) => {
  try {
    const sql = 'insert into post (title,message,account_id) values ($1,$2,$3) returning *'
    const result = await query(sql,[req.body.title,req.body.message,req.body.account_id])
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})

blogRouter.delete("/delete/:id",async(req,res) => {
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


blogRouter.post("/comment",async(req,res) => {
  try {
    const sql = 'insert into comment (comment_text,post_id,account_id) values ($1,$2,$3) returning *'
    const result = await query(sql,[req.body.comment,req.body.post_id,req.body.account_id])
    res.status(200).json(result.rows[0])
  } catch (error) {
    res.statusMessage = error
    res.status(500).json({error: error})
  }
})


module.exports = {
  blogRouter
}