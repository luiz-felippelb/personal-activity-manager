require('dotenv').config();

const express = require("express")
const app = express()
const PORT = 3000
const swaggerUI = require('swagger-ui-express')
const swaggerFile = require('./swagger.json')
const cors = require("cors")

const authenticateJWT = require('./middleware/authJWT');

// Middleware para analisar o corpo da requisição como JSON
app.use(express.json());

app.use(cors())

const auth = require('./routes/auth')
const activity = require('./routes/activity')
const category = require('./routes/category')
const user = require('./routes/user')

app.use('/auth', auth)
app.use('/protected/activity', authenticateJWT, activity)
app.use('/protected/category', authenticateJWT, category)
app.use('/protected/user', authenticateJWT, user)
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

app.listen(PORT, () => {
    console.log(`Server is running on: http://127.0.0.1:${PORT}`)
})