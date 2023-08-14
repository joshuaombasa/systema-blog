const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors)

const blogRoutes = require('./routes/blog')
const authorRoutes = require('./routes/author')

app.use('/blogs', blogRoutes)
app.use('/authors', authorRoutes)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})