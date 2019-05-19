const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const authRouters = require('./routes/auth-API')
const documentRoutes = require('./routes/document-API')
const adminRoutes = require('./routes/admin-API')

const checkAuth = require('./middleware/check-auth')
const checkRole = require('./middleware/check-role')

app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  })
)

app.use('/', authRouters)
app.use('/documents', checkAuth, documentRoutes)
app.use('/admin', checkRole, adminRoutes)

app.use(function (err, req, res, next) {
  res.status(422).send({ error: err.message })
})

app.listen(process.env.DAPP_PORT, function () {
  console.log(`Listening to the port ${process.env.DAPP_PORT}`)
})
