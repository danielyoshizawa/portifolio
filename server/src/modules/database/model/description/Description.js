async function Create(database, description) {
  return await database.run(
    'CREATE (a:Description {title:$title, description:$description}) RETURN a',
    description
  )
}

async function Update(database, description) {
  return await database.run(
    'MATCH (a:Description) SET a.title=$title SET a.description=$description RETURN a',
    description
  )
}

async function Get(database) {
  return await database.run(
    'MATCH (a:Description) RETURN a',
    {}
  )
}

module.exports = {Create, Update, Get}
