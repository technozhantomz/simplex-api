import response from '../response'
import debugLogger from 'debug'
import { simplex } from '../config'

const debugRequest = debugLogger('request:info')

export default app => {
  app.get('/current-currencies', (req, res) => {
    debugRequest('Current Currencies Request Received')
    const baseFiat = {
      USD: {
        symbol: 'CAD',
        name: 'Canadian Dollar'
      },
      EUR: {
        symbol: 'EUR',
        name: 'Euro'
      }
    }
    const baseDigital = {
      BTC: {
        symbol: 'BTC',
        name: 'Bitcoin'
      },
      KES: {
        symbol: 'KES',
        name: 'Kenya Shilling'
      }
    }

    const fiat = simplex.validFiat.reduce((acc, curr) => {
      if (baseFiat[curr]) {
        acc[curr] = baseFiat[curr]
      } else {
        acc[curr] = {
          symbol: curr,
          name: curr
        }
      }
      return acc
    }, {})

    const digital = simplex.validDigital.reduce((acc, curr) => {
      if (baseDigital[curr]) {
        acc[curr] = baseDigital[curr]
      } else {
        acc[curr] = {
          symbol: curr,
          name: curr
        }
      }
      return acc
    }, {})

    response.success(res, {
      fiat: fiat,
      digital: digital
    })
  })
}
