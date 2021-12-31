var keys = require('../config/keys').keys
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(keys["newsapi"]);

var getTopNewsHeadlines = function() {
  return new Promise(function(resolve, reject) {
    newsapi.v2.topHeadlines({
      sources: 'crypto-coins-news',
      language: 'en',
      pageSize: '50'
    }).then(function(response)  {
        resolve(response);
    }).catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
}

module.exports = {
  getTopNewsHeadlines: getTopNewsHeadlines
}
