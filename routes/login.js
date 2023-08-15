const express = require('express')
const { check, validationResult} = require('express-validator')
const router = express.Router()
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemablog'
}

router.post('/',[
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please eneter a password longer than 6 caharacters").isLength({min: 7})
], async(req, res) => {
    const { email, password} = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM author WHERE email=?`
        const [rows] = await connection.query(sql, [email])

        if (rows.length === 0) {
            connection.end()
            return res.status(400).json("Incorect credentials")
        }

        
    } catch(error) {
        return res.status(400).json(error)
    }
})

module.exports = router