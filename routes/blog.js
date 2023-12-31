const express = require('express')
const router = express.Router()
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemablog'
}

const auth = require('../middleware/auth')

router.get('/', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig)
        const getAllBlogsSql = `SELECT blog.id, blog.title, blog.story, blog.created_at, CONCAT(author.first_name, ' ', author.last_name)
        AS author_name FROM blog INNER JOIN author ON blog.author_id=author.id;`
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

router.post('/newBlog', auth, async (req, res) => {
    const {title, description} = req.body
    const authorId = req.userId
    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `INSERT INTO blog (title, story,  author_id)
        VALUES (?, ?, ?)`
        await connection.query(sql, [title, description, parseInt(authorId)])
        const blogSQL = `SELECT blog.id FROM blog WHERE blog.title=?`
        const [rows] = await connection.query(blogSQL, [title])
        console.log(rows)
        connection.end()
        return res.status(200).json(rows[0])
    } catch(error) {
        return res.status(400).json(error)
    }

})

module.exports = router