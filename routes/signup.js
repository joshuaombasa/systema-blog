const express = require('express')

const router = express.Router()

router.post('/signup', async(req, res) => {
    const {title, story, author_id} = req.body

    
})

module.exports  = router