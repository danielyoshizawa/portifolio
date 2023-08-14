const neo4j = require('neo4j-driver')
const dotenv = require('dotenv')

class Database {

  constructor() {
    dotenv.config()
    this.driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_DB_NAME, process.env.NEO4J_PASSWORD))
  }

  async destructor() {
    await this.driver.close()
  }

  async run(query, params ) {
    const session = this.driver.session()

    try {
      const result = await session.run(query, params)
      return result.records
    } catch(err) {
      throw err // TODO : Think about it
    } finally {
      await session.close()
    }
  }
}

module.exports = { Database }
