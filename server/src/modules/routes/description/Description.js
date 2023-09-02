const description = require('../../database/model/description/Description')

class Description {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/description', async (req, res) => {
      try {
        const records = await description.Get(this.database)
        const singleRecord = records[0]
        const node = singleRecord.get(0)
        res.json(JSON.stringify(node.properties))
      } catch(error) {
        res.status(500).send(error)
      }
    })
  }

  _update() {
    this.app.post('/description', this.authenticateToken, async (req, res) => {
      try {
        const records = await description.Update(this.database, req.body)
        if (records.length) {
          res.status(201).send("Resource Updated")
        } else {
          res.status(503).header("Retry-After", 120).send("Unable to update resource")
        }
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  _create() {
    // TODO #142 : This will be implemented with the multiple descriptions update
  }

  _remove() {
    // TODO #142 : This will be implemented with the multiple descriptions update
  }

  initialize() {
    this._get()
    this._update()
    this._create()
    this._remove()
  }
}

module.exports = {Description}
