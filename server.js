const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())

app.use(express.json())

const blogRoutes = require('./routes/blog')
const authorRoutes = require('./routes/author')
const loginRoutes = require('./routes/login')
const signupRoutes = require('./routes/signup')
const nothingRoutes = require('./routes/nothing')


app.use('/blogs', blogRoutes)
app.use('/authors', authorRoutes)
app.use('/login', loginRoutes)
app.use('/signup', signupRoutes)
app.use('/nothing', nothingRoutes)

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})