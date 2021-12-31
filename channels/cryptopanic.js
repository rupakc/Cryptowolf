var request = require('request');
var commonutils = require('../utils/commonutils');
var keys = require('../config/keys').keys;

var cryptopanicResponseData = function() {
  let cryptoUrl = "https://cryptopanic.com/api/posts/";
  var options = {
    url: cryptoUrl,
    qs:{"auth_token": keys["cryptopanic"], "public": "true"}
  }
  return commonutils.getPromise(options);
}

module.exports = {
  getCryptopanicResponseData: cryptopanicResponseData
};
