const newsParser = require('../parse/parser').parseCryptoControlNewsResponse;
const cryptocontrol = require('../channels/cryptocontrol');

var cryptocontrolNewsPipeline = function() {
  let newsPromise = cryptocontrol.getTopNews();
  return new Promise(function(resolve, reject) {
    newsPromise.then(function(resultList) {
      let parsedResponseList = newsParser(resultList);
      resolve(parsedResponseList);
    }).catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  cryptocontrolNewsPipeline: cryptocontrolNewsPipeline
};
