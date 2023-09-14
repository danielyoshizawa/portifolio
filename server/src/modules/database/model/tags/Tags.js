const timezone = process.env.TIMEZONE

async function Create(database, parameters) {
  return await database.run(
    `
      CREATE (a:Tag {
        name     : $name,
        type     : $type,
        priority : $priority,
        created  : datetime({timezone: $timezone})
      })
      RETURN a
    `,
    {
      ...parameters,
      timezone
    }
  )
}

async function Update(database, id, parameters) {
  return await database.run(
    `
      MATCH (a:Tag)
        WHERE ID(a)    = $id
        SET a.name     = $name
        SET a.type     = $type
        SET a.priority = $priority
        SET a.updated  = datetime({timezone: $timezone})
      RETURN a
    `,
    {
      id: parseInt(id),
      ...parameters,
      timezone
    }
  )
}

async function Get(database) {
  return await database.run(
    'MATCH (a:Tag) RETURN a',
    {}
  )
}

async function GetUnique(database, id) {
  return await database.run(
    'MATCH (a:Tag) WHERE ID(a) = $id RETURN a',
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    'MATCH (a:Tag) WHERE ID(a) = $id DELETE a RETURN COUNT(a)',
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
