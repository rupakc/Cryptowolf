var request = require('request');

var getPromise = function (options) {
  return new Promise(function(resolve, reject) {
    request(options,function(error,response,body) {
        if (error){
          reject(error);
        } else {
          resolve(JSON.parse(body));
        }
    });
  });
}

var roundOffDecimal = function(number,decimalPlaces=2) {
  return number.toFixed(decimalPlaces);
}

var getJSONFormatString = function(json) {
  let keyList = Object.keys(json);
  let formattedString = "";
  for (let i = 0; i < keyList.length; i++) {
    formattedString += keyList[i] + " : " + json[keyList[i]] + " | ";
  }
  return formattedString;
}

var formatDateTime = function(datetimeString) {
  let formattedDateTimeString = new Date(datetimeString);
  return formattedDateTimeString.toDateString() + " " + formattedDateTimeString.toLocaleTimeString();
}

module.exports = {
  getPromise: getPromise,
  roundOffDecimal: roundOffDecimal,
  getJSONFormatString: getJSONFormatString,
  formatDateTime: formatDateTime
}
