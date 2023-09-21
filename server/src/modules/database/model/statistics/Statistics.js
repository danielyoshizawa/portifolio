const timezone = process.env.TIMEZONE

async function Create(database, parameters) {
  return await database.run(
    `
      MERGE (v:Visitor {
          ip : $ip
        })
        ON CREATE SET
            v.created = datetime({timezone: $timezone}),
            v.version = $version,
            v.network = $network,
            v.version = $version,
            v.city = $city,
            v.region = $region,
            v.region_code = $region_code,
            v.country = $country,
            v.country_name = $country_name,
            v.country_code = $country_code,
            v.country_code_iso3 = $country_code_iso3,
            v.country_capital = $country_capital,
            v.country_tld = $country_tld,
            v.continent_code = $continent_code,
            v.in_eu = $in_eu,
            v.postal = $postal,
            v.latitude = $latitude,
            v.longitude = $longitude,
            v.timezone = $timezone,
            v.utc_offset = $utc_offset,
            v.country_calling_code = $country_calling_code,
            v.currency = $currency,
            v.currency_name = $currency_name,
            v.languages = $languages,
            v.country_area = $country_area,
            v.country_population = $country_population,
            v.asn = $asn,
            v.org = $org
        ON MATCH SET
          v.updated = datetime({timezone: $timezone})
      MERGE (v)-[r:VISITED { page: $page }]-(t:Time {
        time: apoc.date.format(datetime({timezone: $timezone}).epochMillis, "ms", "yyyy-MM-dd hh:mm")
      })
      RETURN v, r, t
    `,
    {
      ...parameters,
      timezone
    }
  )
}

async function GetVisitors(database) {
  return await database.run(
    'MATCH (a:Visitor) RETURN a',
    {}
  )
}

async function GetUniqueVisitorsCount(database) {
  return await database.run(
    `
      MATCH (v:Visitor) RETURN COUNT(v) as total
    `,
    {}
  )
}

module.exports = {Create, GetVisitors, GetUniqueVisitorsCount}
