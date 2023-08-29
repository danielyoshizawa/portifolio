const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const course = require('./course/Course')
const tags   = require('./tags/Tags')
const workExperience = require('./workExperience/WorkExperience')
const education = require('./education/Education')

dotenv.config()

// Middleman for authorization
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer JWT_ACCESS_TOKEN

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user

    next()
  })
}

class Routes {
  constructor(app, database) {
    this.app = app
    this.database = database
    this.course = new course.Course(this.app, this.database, authenticateToken)
    this.tags = new tags.Tags(this.app, this.database, authenticateToken)
    this.workExperience = new workExperience.WorkExperience(this.app, this.database, authenticateToken)
    this.education = new education.Education(this.app, this.database, authenticateToken)
  }

  initialize() {
    this.course.initialize()
    this.tags.initialize()
    this.workExperience.initialize()
    this.education.initialize()
  }
}

module.exports = {Routes}
