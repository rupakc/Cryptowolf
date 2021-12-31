const bitcoinaverage = require('bitcoinaverage');
const keys = require('../config/keys').keys;

var getDailyCryptoPrice = function(cryptoName) {
  var restClient = bitcoinaverage.restfulClient(keys["bitcoinaveragePublicKey"], keys["bitcoinaveragePrivateKey"]);
  return new Promise(function(resolve, reject) {
    restClient.getHistory('global', cryptoName, 'daily', function(response) {
      response = JSON.parse(response).slice(-1440);
      resolve(response);
    }, function(error){
        console.log(error);
        reject(error);
    });
  });
}

module.exports = {
  getDailyCryptoPrice: getDailyCryptoPrice
};
