const workExperience = require('../../database/model/workExperience/WorkExperience')

class WorkExperience {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/workExperience', async (req, res) => {
      try {
        const records = await workExperience.Get(this.database)

        // Concatenate tags
        const tagsNodes = new Map()
        records.map((elem) => {
          const id   = elem.get(0).identity
          let tags = tagsNodes.get(id) || []
          tags.push(elem.get(1))
          tagsNodes.set(id, tags)
        })

        let response = { workExperience: [] }
        const visited = new Map()
        records.map((elem) => {
          const node = elem.get(0)
          const id = node.identity;

          // To avoid duplication, since cypher returns one entry per relationship
          if (visited.get(id)) return
          else visited.set(id, true)

          response.workExperience.push({
            id          : id,
            company     : node.properties.company,
            position    : node.properties.position,
            location    : node.properties.location,
            start       : node.properties.start,
            end         : node.properties.end,
            description : node.properties.description,
            fixed       : node.properties.fixed,
            priotity    : node.properties.priotity,
            tags        : tagsNodes.get(id)
          })
        })
        res.status(200).json(JSON.stringify(response))
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    })

    this.app.get('/workExperience/:id', async (req, res) => {
      try {
        const records = await workExperience.GetUnique(this.database, req.params.id)
        const singleRecord = records[0]
        const node = singleRecord.get(0)
        // TODO : Extract Method
        const tagsNodes = new Map()
        records.map((elem) => {
          const id   = elem.get(0).identity
          let tags = tagsNodes.get(id) || []
          tags.push(elem.get(1))
          tagsNodes.set(id, tags)
        })

        res.status(200).json(JSON.stringify(
          { id : node.identity,
            ...node.properties,
            tags : tagsNodes.get(node.identity)
          }
        ))
      } catch (error) {
        res.status(500).send(error)
      }
    })
  }

  _update() {
    this.app.post('/workExperience/:id', this.authenticateToken, async (req, res) => {
      try {
        const records = await workExperience.Update(this.database, req.params.id, req.body)
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
    this.app.post('/workExperience', this.authenticateToken, async (req, res) => {
      try {
        const records = await workExperience.Create(this.database, req.body)
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
    this.app.post('/workExperience/:id/delete', this.authenticateToken, async (req, res) => {
      try {
        const records = await workExperience.Delete(this.database, req.params.id)
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

module.exports = {WorkExperience}
