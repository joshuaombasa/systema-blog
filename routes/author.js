const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemablog'
}

router.get('/', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig)
    const getAllAuthorsSql = `SELECT first_name, last_name FROM author`
    const [rows] = await connection.query(getAllAuthorsSql)

    if (rows.length === 0) {
        connection.end()
        return res.status(400).json("No authors currently exist in the database")
    }

    connection.end()
    return res.status(200).json(rows)

})


module.exports = router