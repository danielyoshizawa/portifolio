const timezone = process.env.TIMEZONE

async function Create(database, description) {
  return await database.run(
    `CREATE (a:Description {
      title       : $title,
      description : $description,
      created     : datetime({timezone: $timezone})
    }) RETURN a`,
    {
      ...description,
      timezone
    }
  )
}

async function Update(database, description) {
  return await database.run(
    `MATCH (a:Description)
      WHERE ID(a)       = $id
      SET a.title       = $title
      SET a.description = $description
      SET a.updated     = datetime({timezone: $timezone})
      RETURN a
    `,
    {
      ...description,
      timezone
    }
  )
}

async function Get(database) {
  return await database.run(
    'MATCH (a:Description) RETURN a',
    {}
  )
}


async function GetUnique(database, id) {
  return await database.run(
    'MATCH (a:Description) WHERE ID(a) = $id RETURN a',
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    'MATCH (a:Description) WHERE ID(a) = $id DELETE a RETURN COUNT(a)',
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
