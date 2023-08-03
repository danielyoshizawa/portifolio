const express = require('express')
const app = express()
const port = 3001
const fm = require('./modules/util/FileManager')
const data = require('./config/data')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(cors())

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

app.post('/description', async (req, res) => {
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

app.post('/education', async (req, res) => {
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

app.post('/course', async (req, res) => {
  const content = JSON.stringify(req.body)
  await fm.WriteTo(data.filepath['course'], content).then(() => {
    res.status(200).send("Sucess")
  }).catch((error) => {
    res.status(500).send(error)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
