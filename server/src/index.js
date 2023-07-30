const express = require('express')
const app = express()
const port = 3001
const fm = require('./modules/util/FileManager')
const data = require('./config/data')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(404).send("Invalid")
})

app.get('/description', async (req, res) => {
  await fm.ReadFrom(data.filepath['description']).then((data) => {
    res.json(data)
  }).catch((error) => {
    res.status(500).send("Failure")
  })
})

app.post('/description', async (req, res) => {
  const content = JSON.stringify(req.body);
  await fm.WriteTo(data.filepath['description'], content).then(() => {
    res.status(200).send("Success")
  }).catch((error) => {
    res.status(500).send("Failure")
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
