const express = require('express')
const { check, validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const  saltRounds = 10
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'systemablog'
}

const router = express.Router()

router.post('/', [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a password whose length is greater than 5 characters").isLength({min: 6})
], async(req, res) => {
    const {firstname, lastname, email, password} = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array())
    }

    try {
        const connection = await mysql.createConnection(dbConfig)
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const addUserSql = `INSERT INTO author (first_name, last_name, email, password)
        VALUES (?, ?, ?,?)`
        
        await connection.query(addUserSql, [firstname, lastname, email, hashedPassword])
        connection.end()
        return res.status(200).json(`${firstname} ${lastname} signup successful`)
    } catch(error) {
        return res.status(400).json(error)
    }

    
})

module.exports  = router