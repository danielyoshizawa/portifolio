const tags = require('../../database/model/tags/Tags')

class Tags {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/tags', async (req, res) => {
      try {
        const records = await tags.Get(this.database)
        let response = { tags: [] }
        records.map((elem) => {
          const node = elem.get(0)
          response.tags.push({
            id          : node.identity,
            name        : node.properties.name,
            type        : node.properties.type,
            priority    : node.properties.priority,
          })
        })
        res.status(200).json(JSON.stringify(response))
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    })

    this.app.get('/tags/:id', async (req, res) => {
      try {
        const records = await tags.GetUnique(this.database, req.params.id)
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
    this.app.post('/tags/:id', this.authenticateToken, async (req, res) => {
      try {
        const records = await tags.Update(this.database, req.params.id, req.body)
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
    this.app.post('/tags', this.authenticateToken, async (req, res) => {
      try {
        const records = await tags.Create(this.database, req.body)
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
    this.app.post('/tags/:id/delete', this.authenticateToken, async (req, res) => {
      try {
        const records = await tags.Delete(this.database, req.params.id)
        if (records.length) {
          res.status(200).send("Resource Deleted")
        } else {
          res.status(503).header("Retry-After", 120).send("Unable to delete resource")
        }
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

module.exports = {Tags}
