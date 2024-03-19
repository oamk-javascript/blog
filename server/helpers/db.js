const { Pool } = require('pg')

const query = (sql,values=[]) => {
  return new Promise(async(resolve,reject)=> {
    try {
      const pool = openDb()
      const result = await pool.query(sql,values)
      resolve(result)
    } catch (error) {
      reject(error.message)
    }
  })
}

const openDb = () => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "blog",
    password: "root",
    port: 5435
  })
  return pool
}

module.exports = {
  query
}