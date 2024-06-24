const express = require("express")
const app = express()
const port = 3000

const activity = require('./src/routes/activity')
const category = require('./src/routes/category')
const user = require('./src/routes/user')

app.use('/activity', activity)
app.use('/category', category)
app.use('/user', user)

app.listen(port, () => {
    console.log(`Server is running on: http://127.0.0.1:${port}`)
})