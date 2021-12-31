const parser = require('../parse/parser').parseCryptoPanicResponse;
const cryptoPanic = require('../channels/cryptopanic').getCryptopanicResponseData;

var cryptoPanicPipeline = function() {
  let cryptoPanicPromise = cryptoPanic();
  return new Promise(function(resolve, reject) {
    cryptoPanicPromise.then(function(responseJson) {
      let parsedResponseJson = parser(responseJson);
      resolve(parsedResponseJson);
    }).catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  cryptoPanicPipeline: cryptoPanicPipeline
};

// cryptoPanicPipeline().then(function(result) {
//   console.log(result);
// }).catch(function(error) {
//   console.log(error);
// });
