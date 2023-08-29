class Auth {
  constructor(app, generateAccessToken, authenticateToken) {
    this.app = app
    this.generateAccessToken = generateAccessToken
    this.authenticateToken = authenticateToken
  }

  _get() {
    this.app.get('/validateToken', this.authenticateToken, (req, res) => {
      return res.sendStatus(200)
    })
  }

  _update() {
    this.app.post('/login', async (req, res) => {
      if (req.body.username !== process.env.ADMIN_USERNAME || req.body.password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).send("Invalid Username or Password")
      }

      res.status(200).json(this.generateAccessToken(req.body.username))
    })
  }

  _create() {

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

module.exports = {Auth}
