import fetch from 'node-fetch';

export const fetchGlobalMetrics = async () => {
  const url = 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest';
  const promise = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    }
  })
  return promise.json()
}

export const fetchCryptocurrencies = async () => {
  const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&sort=market_cap&sort_dir=desc'
  const promise = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    }
  })
  return promise.json()
}

export const fetchCryptocurrenciesPage = async (start, sort, order) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start !== 1 ? (start * 50) + 1 : 1}&limit=50&sort=${sort ? sort : 'market_cap'}&sort_dir=${order ? order : 'desc'}`;
  const promise = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    }
  })
  return promise.json()
}

export const fetchSearch = async query => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?slug=${query.split(' ').join('-')}`;
  const promise = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Accept-Encoding': 'deflate, gzip',
      'X-CMC_PRO_API_KEY': process.env.API_KEY
    }
  })
  return promise.json()
}
