const express = require('express')
const { check, validationResult} = require('express-validator')
const router = express.Router()
const JWT  =require('jsonwebtoken')
const mysql = require('mysql2/promise')
const bcrypt = require('bcrypt')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemablog'
}

const SECRET_KEY = '23DH2029E3E7D02'

router.post('/',[
    check("email","Please enter a valid email").isEmail(),
    check("password","Please eneter a password longer than 6 caharacters").isLength({min: 7})
], async(req, res) => {
    const { email, password} = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({message : errors.array()[0].msg})
    }

    try {
        const connection = await mysql.createConnection(dbConfig)
        const sql = `SELECT * FROM author WHERE email=?`
        const [rows] = await connection.query(sql, [email])

        if (rows.length === 0) {
            connection.end()
            return res.status(400).json({message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, rows[0].password)

        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"})
        }

        const userId = rows[0].id
        const token  = JWT.sign({userId: userId}, SECRET_KEY, {expiresIn: '1h'})
        connection.end()
        return res.status(200).json({message: "Login successsful", token: token})

        
    } catch(error) {
        return res.status(400).json({message: error})
    }
})

module.exports = router