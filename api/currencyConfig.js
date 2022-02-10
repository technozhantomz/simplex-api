const fiat = [
 "USD",
  "EUR",
  "CAD"
];
const crypto = [ "KES"];

const handler = function (defaultValue = 42) {
  return {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : defaultValue;
    }
  };
};

const minFiatTarget = { CAD: 50, EUR: 50 };
const maxFiatTarget = { CAD: 20000, EUR: 20000 };

const minFiat = new Proxy(minFiatTarget, handler(50));
const maxFiat = new Proxy(maxFiatTarget, handler(20000));

module.exports = {
  fiat,
  crypto,
  minFiat,
  maxFiat
};
