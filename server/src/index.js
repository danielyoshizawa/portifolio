const express = require('express')
const app = express()
const port = 3001
const fm = require('./modules/util/FileManager')
const data = require('./config/data')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

// Middleman for authorization
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer JWT_ACCESS_TOKEN

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

app.get('/', (req, res) => {
  res.send("Invalid")
})

app.get('/description', async (req, res) => {
  await fm.ReadFrom(data.filepath['description']).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.post('/description', authenticateToken, async (req, res) => {
  const content = JSON.stringify(req.body);
  await fm.WriteTo(data.filepath['description'], content).then(() => {
    res.status(200).send("Success")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.get('/education', async (req, res) => {
  await fm.ReadFrom(data.filepath['education']).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.post('/education', authenticateToken, async (req, res) => {
  const content = JSON.stringify(req.body);
  await fm.WriteTo(data.filepath['education'], content).then(() => {
    res.status(200).send("Success")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.get('/course', async (req, res) => {
  await fm.ReadFrom(data.filepath['course']).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.post('/course', authenticateToken, async (req, res) => {
  const content = JSON.stringify(req.body)
  await fm.WriteTo(data.filepath['course'], content).then(() => {
    res.status(200).send("Sucess")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.get('/workExperience', async (req, res) => {
  await fm.ReadFrom(data.filepath['workExperience']).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.post('/workExperience', authenticateToken, async (req, res) => {
  const content = JSON.stringify(req.body)
  await fm.WriteTo(data.filepath['workExperience'], content).then(() => {
    res.status(200).send("Sucess")
  }).catch((error) => {
    res.status(500).send(error)
  })
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
