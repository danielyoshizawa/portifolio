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
const description = require('./modules/database/model/description/Description')
const education = require('./modules/database/model/education/Education')
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

app.get('/description', async (req, res) => {
  try {
    const records = await description.Get(db)
    const singleRecord = records[0]
    const node = singleRecord.get(0)
    res.json(JSON.stringify(node.properties))
  } catch(error) {
    res.status(500).send(error)
  }
})

app.post('/description', authenticateToken, async (req, res) => {
  try {
    const records = await description.Update(db, req.body)
    res.status(200).send("Success")
  } catch (error) {
    res.status(500).send(error)
  }
})

app.get('/education', async (req, res) => {
  try {
    const records = await education.Get(db)
    let response = { education: [] }
    records.map((elem) => {
      const node = elem.get(0)
      response.education.push({
        id     : node.identity,
        name   : node.properties.name,
        course : node.properties.course,
        type   : node.properties.type,
        start  : node.properties.start,
        end    : node.properties.end,
        fixed  : node.properties.fixed
      })
    })
    res.status(200).json(JSON.stringify(response))
  } catch (error) {
    res.status(500).send(error)
  }
})


app.get('/education/:id', async (req, res) => {
  try {
    const records = await education.GetUnique(db, req.params.id)
    const singleRecord = records[0]
    const node = singleRecord.get(0)
    res.status(200).json(JSON.stringify(
      { id : node.identity,
        ...node.properties
      }
    ))
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/education', authenticateToken, async (req, res) => {
  try {
    const records = await education.Create(db, req.body)
    res.status(200).send("Success")
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/education/:id', authenticateToken, async (req, res) => {
  try {
    const records = await education.Update(db, req.params.id, req.body)
    res.status(200).send("Success")
  } catch (error) {
    res.status(500).send(error)
  }
})

app.post('/education/:id/delete', authenticateToken, async (req, res) => {
  try {
    const records = await education.Delete(db, req.params.id)
    res.status(200).send("Success")
  } catch (error) {
    res.status(500).send(error)
  }
})

function generateAccessToken(username) {
  // TODO : Add expiresIn
  return jwt.sign(username, process.env.TOKEN_SECRET)
}

app.post('/login', async (req, res) => {
  // TODO : Move to a proper place
  const username = "test"
  const password = "test"
  if (req.body.username !== username || req.body.password !== password) {
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
