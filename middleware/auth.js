const JWT = require('jsonwebtoken')

const SECRET_KEY = '23DH2029E3E7D02'

module.exports = async (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(400).json("Please login first")
    }

    const decoded = await JWT.verify(token, SECRET_KEY)
    const userId = decoded.userId
    req.userId = userId
    console.log(userId)
    next()
}