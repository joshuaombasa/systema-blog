const express = require('express')
const app = express()
const port = 3000

const blogRoutes = require('./routes/blog')

app.use('/blogs', blogRoutes)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})