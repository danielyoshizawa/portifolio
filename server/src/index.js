const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
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

router.initialize()

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
