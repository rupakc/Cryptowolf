const bitcoinAverage = require('../channels/bitcoinaverage');
const parser = require('../parse/parser').parseBitcoinAveragePrice;

var getCryptoPricePipeline = function(cryptoName) {
  let cryptoPromise = bitcoinAverage.getDailyCryptoPrice(cryptoName);
  return new Promise(function(resolve, reject) {
    cryptoPromise.then(function(response) {
      resolve(parser(response));
    }).catch(function(error) {
        console.log(error);
        reject(error);
    });
  });
}

var getCryptoDataInHighChartsFormat = function(cryptoName) {
  var highchartsJson = {
      title: {
          text: 'Daily Price Across All Exchanges'
      },
      subtitle: {
          text: 'Source: bitcoinaverage.com'
      },
      yAxis: {
          title: {
              text: 'Price in USD'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 800
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
    };

    let cryptoPromise = getCryptoPricePipeline(cryptoName);
    return new Promise(function(resolve, reject) {
      cryptoPromise.then(function(response) {
        let dataList = [];
        for(let i = 0; i < response.length; i++) {
          dataList.push(response[i]["average"]);
        }
        let seriesJson = {data: dataList, name: cryptoName};
        highchartsJson.series = [seriesJson];
        resolve(highchartsJson);
      }).catch(function(error) {
        console.log(error);
        reject(error);
      });
    });
}

module.exports = {
  getCryptoPricePipeline: getCryptoPricePipeline,
  getCryptoDataInHighChartsFormat: getCryptoDataInHighChartsFormat
};
