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
    try {
        const connection = await mysql.createConnection(dbConfig)
        const getAllBlogsSql = `SELECT * FROM blog`
        const [rows] = await connection.query(getAllBlogsSql)
        if (rows.length === 0) {
            connection.end()
            return res.status(400).json("No blog exists currently")
        }
        connection.end()
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
})


router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const connection = await mysql.createConnection(dbConfig)
        const getSelectedBlogSql = `SELECT * FROM blog WHERE id=?`
        const [rows] = await connection.query(getSelectedBlogSql, [parseInt(id)])
        if (rows.length === 0) {
            connection.end()
            return res.status(200).json("Blog with the selected id does not exist")
        }
        connection.end()
        return res.status(200).json(rows)
    } catch (error) {
        return res.status(400).json(error)
    }
})

module.exports = router