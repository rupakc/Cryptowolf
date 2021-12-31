const newsFetch = require('../channels/newsapi').getTopNewsHeadlines;
const newsApiParser = require('../parse/parser').parseNewsAPIResponse;

var newsApiPipeline = function() {
  let newsPromise = newsFetch();
  return new Promise(function(resolve, reject) {
    newsPromise.then(function(resultListJson) {
      let parsedNewsJsonList = newsApiParser(resultListJson);
      resolve(parsedNewsJsonList);
    }).catch(function(error) {
        console.log(error);
        reject(error);
    });
  });
}

module.exports = {
  newsApiPipeline: newsApiPipeline
};
