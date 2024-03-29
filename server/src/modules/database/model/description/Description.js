const timezone = process.env.TIMEZONE

async function Create(database, parameters) {
  let query = `
    CREATE (
      a:Description {
        title       : $title,
        description : $description,
        created     : datetime({timezone: $timezone})
      }
    )
    WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag)
        WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS {updated: datetime({timezone: $timezone})}]->(t${index})
      WITH *
    `
  })
  query += `RETURN a`

  return await database.run(
    query,
    {
      ...parameters,
      timezone
    }
  )
}

async function Update(database, id, parameters) {
  let query = `
    OPTIONAL MATCH (d:Description)-[r:TAGS]-(b:Tag)
      WHERE ID(d) = $id
      DELETE r
      WITH d
    MATCH (a:Description)
      WHERE ID(a)       = $id
      SET a.title       = $title
      SET a.description = $description
      SET a.updated     = datetime({timezone: $timezone})
      WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag)
        WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS {updated: datetime({timezone: $timezone})}]->(t${index})
      WITH *
    `
  })
  query += `RETURN a`

  return await database.run(
    query,
    {
      id : parseInt(id),
      ...parameters,
      timezone
    }
  )
}

async function Get(database) {
  return await database.run(
    `
      MATCH (a:Description)
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a, b
    `,
    {}
  )
}


async function GetUnique(database, id) {
  return await database.run(
    `
      MATCH (a:Description) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a,b
    `,
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    `
      MATCH (a:Description) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[r]-()
      DELETE a, r
      RETURN COUNT(a)
    `,
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
