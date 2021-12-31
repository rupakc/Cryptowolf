const roundOff = require('../utils/commonutils').roundOffDecimal;
const formatDateTime =  require('../utils/commonutils').formatDateTime;

var parseNewsAPIResponse = function(newsReponseJson) {
  let articleList = newsReponseJson["articles"];
  if (articleList == undefined || articleList == null) {
    return [];
  }
  for (var i = 0; i < articleList.length; i++) {
    delete articleList[i]["source"];
    delete articleList[i]["author"];
    articleList[i]["publishedAt"] = formatDateTime(articleList[i]["publishedAt"]);
  }
  return articleList;
}

var parseCryptoControlNewsResponse = function(cryptoNewsJsonList) {
  var parsedNewsListJson = [];
  for (let i = 0; i < cryptoNewsJsonList.length; i++) {
    let parsedJson = {};
    parsedJson["activityHotness"] = roundOff(cryptoNewsJsonList[i]["activityHotness"]);
    parsedJson["description"] = cryptoNewsJsonList[i]["description"];
    parsedJson["publishedAt"] = formatDateTime(cryptoNewsJsonList[i]["publishedAt"]);
    parsedJson["title"] = cryptoNewsJsonList[i]["title"];
    parsedJson["thumbnail"] = cryptoNewsJsonList[i]["thumbnail"];
    parsedJson["url"] = cryptoNewsJsonList[i]["url"];
    let coinNameList = [];
    if (cryptoNewsJsonList[i]["coins"] != undefined && cryptoNewsJsonList[i]["coins"] != null && cryptoNewsJsonList[i]["coins"].length != 0) {
      for (let j = 0; j < cryptoNewsJsonList[i]["coins"].length; j++) {
        coinNameList.push(cryptoNewsJsonList[i]["coins"][j]["name"]);
      }
    }
    parsedJson["coinList"] = coinNameList;
    parsedNewsListJson.push(parsedJson);
  }
  return parsedNewsListJson;
}

var parseCryptoControlTwitterResponse = function(cryptoResponseJsonList) {
  let parsedJsonList = [];
  for (let i = 0; i < cryptoResponseJsonList.length; i++) {
    parsedJsonList.push({ "retweetCount": cryptoResponseJsonList[i]["retweetCount"],
                          "favoriteCount": cryptoResponseJsonList[i]["favoriteCount"],
                          "text": cryptoResponseJsonList[i]["text"],
                          "username": cryptoResponseJsonList[i]["username"],
                          "publishedAt": formatDateTime(cryptoResponseJsonList[i]["publishedAt"]),
                          "activityHotness": roundOff(cryptoResponseJsonList[i]["activityHotness"])
                        });
  }
  return parsedJsonList;
}

var parseCryptoControlRedditResponse = function(cryptoResponseJsonList) {
  let parsedJsonList = [];
  for (let i = 0; i < cryptoResponseJsonList.length; i++) {
    parsedJsonList.push({"comments": cryptoResponseJsonList[i]["comments"],
                         "downvotes": cryptoResponseJsonList[i]["downvotes"],
                         "upvotes": cryptoResponseJsonList[i]["upvotes"],
                         "description": cryptoResponseJsonList[i]["description"],
                         "subreddit": cryptoResponseJsonList[i]["subreddit"],
                         "publishedAt": formatDateTime(cryptoResponseJsonList[i]["publishedAt"]),
                         "title": cryptoResponseJsonList[i]["title"],
                         "url": cryptoResponseJsonList[i]["url"],
                         "activityHotness": roundOff(cryptoResponseJsonList[i]["activityHotness"])

                       });
  }
  return parsedJsonList;
}

var parseCryptoPanicResponse = function(cryptopanicResponseJsonList) {
  var resultList = cryptopanicResponseJsonList["results"];
  let parsedJsonList = [];
  if (resultList == null || resultList == undefined || resultList.length == 0) {
    return parsedJsonList;
  }
  for (let i = 0; i < resultList.length; i++) {
    let parsedJson = {};
    parsedJson = {"domain": resultList[i]["domain"],
                  "title": resultList[i]["title"],
                  "publishedAt": formatDateTime(resultList[i]["published_at"]),
                  "url": resultList[i]["url"],
                  "lol": resultList[i]["votes"]["lol"]
                  };
   let parsedCurrencyList = [];
   let currencyList = resultList[i]["currencies"];
   if (currencyList != null && currencyList != undefined && currencyList.length != 0) {
     for (let j = 0; j < currencyList.length; j++) {
       parsedCurrencyList.push(currencyList[j]["title"]);
     }
   }
   parsedJson["coinList"] = parsedCurrencyList;
   parsedJsonList.push(parsedJson);
  }
  return parsedJsonList;
}

var parseBitcoinAveragePrice = function(response) {
  return response;
}

module.exports = {
  parseNewsAPIResponse: parseNewsAPIResponse,
  parseCryptoControlNewsResponse: parseCryptoControlNewsResponse,
  parseCryptoControlTwitterResponse: parseCryptoControlTwitterResponse,
  parseCryptoControlRedditResponse: parseCryptoControlRedditResponse,
  parseCryptoPanicResponse: parseCryptoPanicResponse,
  parseBitcoinAveragePrice: parseBitcoinAveragePrice
}
