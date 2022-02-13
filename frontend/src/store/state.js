
const handler = function (defaultValue = 42) {
  return {
    get: function (target, name) {
      return target.hasOwnProperty(name) ? target[name] : defaultValue;
    }
  };
};

export default {
  status: {
    invalidFiatAmount: false,
    invalidDigitalAmount: true,
    invalidAddress: false,
    invalidFiatAbove: false,
    invalidFiatBelow: false
  },
  orderInfo: {
    fiatCurrency: 'EUR',
    digitalCurrency: 'KES',
    requestedCurrency: 'KES',
    fiatAmount: 50,
    fiatTotal: 50,
    digitalAmount: 6473,
    digitalAddress: '',
    userId: '',
    linkQuery: {}
  },
  minFiat: new Proxy({EUR: 50}, handler(50)),
  maxFiat: new Proxy({EUR: 20000}, handler(20000))
};
