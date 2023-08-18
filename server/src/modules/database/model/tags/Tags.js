async function Create(database, parameters) {
  return await database.run(
    `CREATE (a:Tag {
      name:$name,
      type:$type,
      created:timestamp()
    }) RETURN a
    `,
    parameters
  )
}

async function Update(database, id, parameters) {
  return await database.run(
    `MATCH (a:Tag)
      WHERE ID(a) = $id
      SET a.name = $name
      SET a.type = $type
    RETURN a
    `,
    {
      id: parseInt(id),
      ...parameters
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
    'MATCH (a:Tag) WHERE ID(a) = $id DELETE a',
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
