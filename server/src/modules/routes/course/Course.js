const course = require('../../database/model/course/Course')

class Course {
  constructor(app, database, authenticateToken) {
    this.app = app
    this.database = database
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/course', async (req, res) => {
      try {
        const records = await course.Get(this.database)
        let response = { course: [] }
        records.map((elem) => {
          const node = elem.get(0)
          response.course.push({
            id          : node.identity,
            name        : node.properties.name,
            date        : node.properties.date,
            institution : node.properties.institution,
            validation  : node.properties.validation,
            link        : node.properties.date,
            fixed       : node.properties.fixed
          })
        })
        res.status(200).json(JSON.stringify(response))
      } catch (error) {
        console.log(error)
        res.status(500).send(error)
      }
    })

    this.app.get('/course/:id', async (req, res) => {
      try {
        const records = await course.GetUnique(this.database, req.params.id)
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
    this.app.post('/course/:id', this.authenticateToken, async (req, res) => {
      try {
        const records = await course.Update(this.database, req.params.id, req.body)
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
    this.app.post('/course', this.authenticateToken, async (req, res) => {
      try {
        const records = await course.Create(this.database, req.body)
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
    this.app.post('/course/:id/delete', this.authenticateToken, async (req, res) => {
      try {
        const records = await course.Delete(this.database, req.params.id)
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

module.exports = {Course}
