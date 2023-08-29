const timezone = process.env.TIMEZONE

async function Create(database, parameters) {
  return await database.run(
    `CREATE (a:Course {
      name        : $name,
      date        : $date,
      institution : $institution,
      validation  : $validation,
      link        : $link,
      fixed       : $fixed,
      created     : datetime({timezone: $timezone})
    }) RETURN a
    `,
    {
      ...parameters,
      timezone
    }
  )
}

async function Update(database, id, parameters) {
  return await database.run(
    `MATCH (a:Course)
      WHERE ID(a)       = $id
      SET a.name        = $name
      SET a.date        = $date
      SET a.institution = $institution
      SET a.validation  = $validation
      SET a.link        = $link
      SET a.fixed       = $fixed
      SET a.updated     = datetime({timezone: $timezone})
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
    'MATCH (a:Course) RETURN a',
    {}
  )
}

async function GetUnique(database, id) {
  return await database.run(
    'MATCH (a:Course) WHERE ID(a) = $id RETURN a',
    {id : parseInt(id)}
  )
}

async function Delete(database, id) {
  return await database.run(
    'MATCH (a:Course) WHERE ID(a) = $id DELETE a',
    {id : parseInt(id)}
  )
}

module.exports = {Create, Update, Get, GetUnique, Delete}
