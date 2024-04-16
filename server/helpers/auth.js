require('dotenv').config()
const jwt = require('jsonwebtoken')

function auth(req,res,next) {
  if (!req.headers.authorization) {
    res.statusMessage = "Authorization required"
    res.status(401).json({message: "Authorization required"})
  } else {
    try {
      const token = req.headers.authorization
      jwt.verify(token, process.env.JWT_SECRET_KEY)
      next()
    } catch (err) {
      res.statusMessage = "Invalid credentials"
      res.status(403).json({message:"Invalid credentials"})
    }
  }
}

module.exports={ auth }