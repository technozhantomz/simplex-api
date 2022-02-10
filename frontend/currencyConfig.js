const fiat = [
  "USD",
  "EUR",
  "CAD"
];
const crypto = ["KES"];

const handler = function (defaultValue = 42) {
  return {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : defaultValue;
    },
  };
};

const minFiatTarget = { EUR: 50, CAD: 50 };
const maxFiatTarget = { EUR: 20000, CAD: 20000 };

const minFiat = new Proxy(minFiatTarget, handler(50));
const maxFiat = new Proxy(maxFiatTarget, handler(20000));

export { fiat, crypto, minFiat, maxFiat };
