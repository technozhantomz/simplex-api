import {minFiat, maxFiat, fiat, crypto} from '../currencyConfig';

let simplex = {
  validFiat: process.env.FIAT_CURRENCIES.split(',') || fiat,
  validDigital: process.env.DIGITAL_CURRENCIES.split(',') || crypto,
  minFiat: minFiat,
  maxFiat: maxFiat
};
let host = {
  url: process.env.API_HOST || 'http://122.0.0.1:8080'
};
let recaptcha = {
  siteKey: process.env.RECAPTCHA_SITE_KEY || '6Lcyv6cdAAAAAIRdu0-f8wFH36MIVD30mfF4iMWk'
};
export {
  simplex,
  host,
  recaptcha
};
