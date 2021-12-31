var CryptoNewsAPI = require('crypto-news-api').default
var keys = require('../config/keys').keys
const Api = new CryptoNewsAPI(keys["cryptocontrol"])

var getTopNews = function() {
  let topNewsPromise = Api.getTopNews();
    return new Promise(function(resolve, reject) {
      topNewsPromise.then(function (articles) {
        resolve(articles);
      }).catch(function (error) {
         console.log(error)
         reject(error);
       })
    });
}

var getLatestSocialDataByCoin = function(coinNameList,socialChannelName="twitter") {
  let coinPromiseList = [];
  if (socialChannelName == "twitter") {
    for (let i = 0; i < coinNameList.length; i++) {
      coinPromiseList.push(Api.getLatestTweetsByCoin(coinNameList[i]));
    }
  } else {
    for (let i = 0; i < coinNameList.length; i++) {
      coinPromiseList.push(Api.getLatestRedditPostsByCoin(coinNameList[i]));
    }
  }
  return new Promise(function(resolve, reject) {
    let flattenedResultList = [];
    Promise.all(coinPromiseList).
    then(function(resultList) {
      for (var i = 0; i < resultList.length; i++) {
        for (var j = 0; j < resultList[i].length; j++) {
          flattenedResultList.push(resultList[i][j]);
        }
      }
      resolve(flattenedResultList);
    }).catch(function(error) {
      reject(error);
    });
  });
}

module.exports = {
  getTopNews: getTopNews,
  getLatestSocialDataByCoin: getLatestSocialDataByCoin
}
