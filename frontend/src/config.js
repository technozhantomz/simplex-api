import {minFiat, maxFiat, fiat, crypto} from '../currencyConfig';

let simplex = {
  validFiat: fiat,
  validDigital: crypto,
  minFiat: minFiat,
  maxFiat: maxFiat
};
let host = {
  url: process.env.API_HOST
};
let recaptcha = {
  siteKey: process.env.RECAPTCHA_SITE_KEY || ''
};
export {
  simplex,
  host,
  recaptcha
};
