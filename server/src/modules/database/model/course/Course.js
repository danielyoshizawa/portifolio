const timezone = process.env.TIMEZONE

async function Create(database, parameters) {
  let query = `
    CREATE (a:Course {
      name        : $name,
      date        : $date,
      institution : $institution,
      validation  : $validation,
      link        : $link,
      fixed       : $fixed,
      created     : datetime({timezone: $timezone})
    })
    WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag) WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS {created: datetime({timezone: $timezone})}]->(t${index})
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
    OPTIONAL MATCH (c:Course)-[r:TAGS]-(b:Tag)
      WHERE ID(c) = $id
      DELETE r
    WITH c
    MATCH (a:Course)
      WHERE ID(a)       = $id
      SET a.name        = $name
      SET a.date        = $date
      SET a.institution = $institution
      SET a.validation  = $validation
      SET a.link        = $link
      SET a.fixed       = $fixed
      SET a.updated     = datetime({timezone: $timezone})
    WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag) WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS {updated: datetime({timezone: $timezone})}]->(t${index})
      WITH *
    `
  })

  query += 'RETURN a'

  return await database.run(
    query ,
    {
      id: parseInt(id),
      ...parameters,
      timezone
    }
  )
}

async function Get(database) {
  return await database.run(
    `
      MATCH (a:Course)
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a, b
    `,
    {}
  )
}

async function GetUnique(database, id) {
  return await database.run(
    `
      MATCH (a:Course) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a, b
    `,
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    `
      MATCH (a:Course) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[r]-()
      DELETE a, r
      RETURN COUNT(a)
    `,
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
