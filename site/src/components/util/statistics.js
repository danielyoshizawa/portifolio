export async function Statistics(page) {
  const serverAddress = process.env.REACT_APP_SERVER_ADDRESS

  const getClientInfo = async () => {
    const response = await fetch("https://ipapi.co/json")
    const data = await response.json()
    return data
  }

  let info = await getClientInfo()

  if (info && !info.error) {
    info = { ...info, page }
    fetch(serverAddress + "/statistics",
    {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(info),
      headers : {
        'Content-Type' : 'application/json',
      }
    })
  }
}

// TESTING MODEL
// let info = {
//   "ip": "185.94.188.134",
//   "network": "185.94.188.0/24",
//   "version": "IPv4",
//   "city": "Amsterdam",
//   "region": "North Holland",
//   "region_code": "NH",
//   "country": "NL",
//   "country_name": "Netherlands",
//   "country_code": "NL",
//   "country_code_iso3": "NLD",
//   "country_capital": "Amsterdam",
//   "country_tld": ".nl",
//   "continent_code": "EU",
//   "in_eu": true,
//   "postal": "1012",
//   "latitude": 52.3716,
//   "longitude": 4.8883,
//   "timezone": "Europe/Amsterdam",
//   "utc_offset": "+0200",
//   "country_calling_code": "+31",
//   "currency": "EUR",
//   "currency_name": "Euro",
//   "languages": "nl-NL,fy-NL",
//   "country_area": 41526,
//   "country_population": 17231017,
//   "asn": "AS9009",
//   "org": "M247 Ltd"
// }
