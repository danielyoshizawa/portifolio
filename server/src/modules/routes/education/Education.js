const education = require('../../database/model/education/Education')

class Education {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/education', async (req, res) => {
      try {
        const records = await education.Get(this.database)
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

    this.app.get('/education/:id', async (req, res) => {
      try {
        const records = await education.GetUnique(this.database, req.params.id)
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
  }

  _update() {
    this.app.post('/education/:id', this.authenticateToken, async (req, res) => {
      try {
        const records = await education.Update(this.database, req.params.id, req.body)
        res.status(200).send("Success")
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  _create() {
    this.app.post('/education', this.authenticateToken, async (req, res) => {
      try {
        const records = await education.Create(this.database, req.body)
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
    this.app.post('/education/:id/delete', this.authenticateToken, async (req, res) => {
      try {
        const records = await education.Delete(this.database, req.params.id)
        res.status(200).send("Success")
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  initialize() {
    this._get()
    this._update()
    this._create()
    this._remove()
  }
}

module.exports = {Education}
