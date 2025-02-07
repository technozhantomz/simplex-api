"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productValidation = exports.env = exports.recaptcha = exports.mangodb = exports.simplex = exports.network = undefined;

var _currencyConfig = require("../currencyConfig");

require("dotenv").config({
  path: "../../.env"
});

var network = {
  port: process.env.PORT || 8080
};
var simplex = {
  walletID: process.env.WALLET_ID || "0x5b50320C7EB253e282418C8F040788B51040d46D",
  quoteEP: process.env.QUOTE_EP || "",
  orderEP: process.env.ORDER_EP || "",
  paymentEP: process.env.PAYMENT_EP || "",
  eventEP: process.env.EVENT_EP || "",
  apiKey: process.env.SIMPLEX_APIKEY || "",
  apiVersion: "1",
  validFiat: process.env.FIAT_CURRENCIES ? process.env.FIAT_CURRENCIES.split(",") : ['CAD', 'EUR'],
  validDigital: process.env.DIGITAL_CURRENCIES ? process.env.DIGITAL_CURRENCIES.split(",") : ['BTC', 'LLC'],
  currencyApiKey: "6d6455f945aa4eeba41f0981798b6af8",
  baseCurrency: process.env.BASE_CURRENCY || "EUR",
  minBaseCurrency: process.env.FIAT_MIN_USD || 50, // EUR
  maxBaseCurrency: process.env.FIAT_MAX_USD || 20000, // EUR
  status: {
    initiated: "INITIATED",
    sentToSimplex: "SENT_TO_SIMPLEX",
    deniedSimplex: "DENIED_SIMPLEX",
    processingSimplex: "PROCESSING_SIMPPLEX",
    successSimplex: "SUCCESS_SIMPLEX"
  }
};
var mangodb = {
  host: process.env.DATA_MONGODB_HOST || "localhost",
  port: 27017,
  name: "gonano"
};
var recaptcha = {
  siteKey: '6Lcyv6cdAAAAAIRdu0-f8wFH36MIVD30mfF4iMWk',
  secretKey: '6Lcyv6cdAAAAAKdpta7iob_Z4aXF-6Zv_593TOEj'
};
var env = {
  mode: process.env.NODE_ENV || "production",
  dev: {
    ip: "141.145.165.137",
    accept_language: "en-US,en;q=0.9",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
  }
};

var productValidation = {
  apiKeyHeaderName: process.env.API_KEY_HEADER || "apikey",
  apiKeys: process.env.API_KEY ? [process.env.API_KEY] : ["321654987", "abcdefg"],
  referrerAppleiOS: process.env.IOS_REFERER || "iOS",
  referrerAndroid: process.env.ANDROID_REFERER || "Android",
  specialWebOrigins: process.env.SPECIAL_WEB_ORIGINS ? process.env.SPECIAL_WEB_ORIGINS.split(",") : []
};

exports.network = network;
exports.simplex = simplex;
exports.mangodb = mangodb;
exports.recaptcha = recaptcha;
exports.env = env;
exports.productValidation = productValidation;