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

        if (records.length === 0) {
          return res.status(503).send("Unable to find resource")
        }

        // Concatenate tags
        const tagsNodes = new Map()
        records.map((elem) => {
          const id = elem.get(0).identity
          let tags = tagsNodes.get(id) || []
          tags.push(elem.get(1))
          tagsNodes.set(id, tags)
        })

        let response = []
        const visited = new Map()
        records.map((elem) => {
          const node = elem.get(0)
          const id = node.identity

          if (visited.get(id)) return
          else visited.set(id, true)

          response.push({
            id          : node.identity,
            title       : node.properties.title,
            description : node.properties.description,
            tags        : tagsNodes.get(id)
          })
        })

        res.status(200).json(JSON.stringify(response))
      } catch(error) {
        res.status(500).send(error)
      }
    })

    this.app.get('/description/:id', async (req, res) => {
      try {
        const records = await description.GetUnique(this.database, req.params.id)

        if (records.length === 0) {
          return res.status(503).send("Unable to find resource")
        }

        const singleRecord = records[0]
        const node = singleRecord.get(0)

        // Concatenate tags
        const tagsNodes = new Map()
        records.map((elem) => {
          const id = elem.get(0).identity
          let tags = tagsNodes.get(id) || []
          tags.push(elem.get(1))
          tagsNodes.set(id, tags)
        })

        res.status(200).json(JSON.stringify(
          {
            id          : node.identity,
            title       : node.properties.title,
            description : node.properties.description,
            tags        : tagsNodes.get(node.identity)
          }
        ))
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  _update() {
    this.app.post('/description/:id', this.authenticateToken, async (req, res) => {
      try {
        const records = await description.Update(this.database, req.params.id, req.body)
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
    this.app.post('/description', this.authenticateToken, async (req, res) => {
      try {
        const records = await description.Create(this.database, req.body)
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
    this.app.post('/description/:id/delete', this.authenticateToken, async (req, res) => {
      try {
        const records = await description.Delete(this.database, req.params.id)
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

module.exports = {Description}
