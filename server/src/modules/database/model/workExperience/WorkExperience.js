async function Create(database, parameters) {

  let query = `
    CREATE (
      a:WorkExperience {
      company:$company,
      position:$position,
      location:$location,
      start:$start,
      end:$end,
      description:$description,
      fixed:$fixed
    })
    WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag) WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS]->(t${index})
      WITH *
    `
  })

  query += `Return a`

  return await database.run(query, parameters)
}

async function Update(database, id, parameters) {
  let query = `
    MATCH (a:WorkExperience)
      WHERE ID(a) = $id
      SET a.company = $company
      SET a.position = $position
      SET a.location = $location
      SET a.start = $start
      SET a.end = $end
      SET a.description = $description
      SET a.fixed = $fixed
      WITH a
  `
  const tags = parameters.tags;
  tags && tags.map((tag, index) => {
    query += `
      MATCH (t${index}:Tag) WHERE ID(t${index}) = ${tag.identity}
      MERGE (a)-[:TAGS]->(t${index})
      WITH *
    `
  })

  query += 'RETURN a'

  return await database.run(query,
    {
      id: parseInt(id),
      ...parameters
    }
  )
}

async function Get(database) {
  return await database.run(
    `
      MATCH (a:WorkExperience)
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a,b
    `,
    {}
  )
}

async function GetUnique(database, id) {
  return await database.run(
    `
      MATCH (a:WorkExperience) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[:TAGS]->(b:Tag)
      RETURN a,b
    `,
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    `
      MATCH (a:WorkExperience) WHERE ID(a) = $id
      OPTIONAL MATCH (a)-[r]-()
      DELETE a, r
    `,
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
