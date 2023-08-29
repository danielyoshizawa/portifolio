const express = require('express')
const app = express()
const fm = require('./modules/util/FileManager')
const data = require('./config/data')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const database = require('./modules/database/Database')
const db = new database.Database()
const routes = require('./modules/routes/Routes')
const router = new routes.Routes(app, db)

dotenv.config()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors({
  origin : [process.env.CORS_CLIENT_ADDRESS, process.env.CORS_CLIENT_LOCAL_ADDRESS],
  methods : "GET,POST",
  optionsSucessStatus : 200
}))

// TODO : Remove when all routes are moved to the proper places
// Middleman for authorization
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer JWT_ACCESS_TOKEN

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user

    next()
  })
}

router.initialize()

// Testing endpoint, remove in the future
app.get('/', async (req, res) => {
  res.status(200).send("Cool Dude!")
})

function generateAccessToken(username) {
  // TODO : Add expiresIn
  return jwt.sign(username, process.env.TOKEN_SECRET)
}

app.post('/login', async (req, res) => {
  if (req.body.username !== process.env.ADMIN_USERNAME || req.body.password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).send("Invalid Username or Password")
  }

  res.status(200).json(generateAccessToken(req.body.username))
})

app.get('/validateToken', authenticateToken, (req, res) => {
  return res.sendStatus(200)
})

app.listen(process.env.NETWORK_PORT, process.env.NETWORK_IP, () => {
  console.log(`Server running on http://${process.env.NETWORK_IP}:${process.env.NETWORK_PORT}`)
})

process.on('SIGTERM', () => {
  debug('SIGTERM signal received: closing HTTP server')
  app.close(async () => {
    await db.destructor()
    debug('HTTP server closed')
  })
})
