const socialSource = require('../channels/cryptocontrol');
const searchCoinList = require('../config/constants').coinList;
const parser = require('../parse/parser');

var getParsedSocialResponseData = function(channelName) {
  let socialPromise = socialSource.getLatestSocialDataByCoin(searchCoinList,channelName);
  let parsedResponseList = [];
  return new Promise(function(resolve, reject) {
    socialPromise.then(function(resultList) {
      if (channelName == "twitter") {
        parsedResponseList = parser.parseCryptoControlTwitterResponse(resultList);
      } else if (channelName == "reddit") {
        parsedResponseList = parser.parseCryptoControlRedditResponse(resultList);
      }
      resolve(parsedResponseList);
    }).catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  getParsedSocialResponseData: getParsedSocialResponseData
}
