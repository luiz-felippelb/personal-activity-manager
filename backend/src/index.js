const express = require("express")
const app = express()
const port = 3000
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')

const activity = require('./routes/activity')
const category = require('./routes/category')
const user = require('./routes/user')

app.use('/activity', activity)
app.use('/category', category)
app.use('/user', user)
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(port, () => {
    console.log(`Server is running on: http://127.0.0.1:${port}`)
})