const statistics = require('../../database/model/statistics/Statistics')

class Statistics {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/statistics', async (req, res) => {
      try {
        const records = await statistics.GetVisitors(this.database)
        let response = [];
        records.map((elem) => {
          response.push(elem.get(0).properties)
        })
        res.status(200).json(JSON.stringify(response))
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    })
  }

  _update() {
  }

  _create() {
    this.app.post('/statistics', async (req, res) => {
      try {
        const records = await statistics.Create(this.database, req.body)
        if (records.length) {
          res.status(201).send("Resource Created")
        } else {
          res.status(503).header("Retry-After", 120).send("Unable to create resource")
        }
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  _remove() {
  }

  initialize() {
    this._get()
    this._update()
    this._create()
    this._remove()
  }
}

module.exports = {Statistics}
