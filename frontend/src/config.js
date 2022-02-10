import {minFiat, maxFiat, fiat, crypto} from '../currencyConfig';

let simplex = {
  validFiat: fiat,
  validDigital: crypto,
  minFiat: minFiat,
  maxFiat: maxFiat
};
let host = {
  url: process.env.API_HOST || 'http://127.0.0.1:8080'
};
let recaptcha = {
  siteKey: process.env.RECAPTCHA_SITE_KEY || ''
};
export {
  simplex,
  host,
  recaptcha
};
