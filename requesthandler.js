let $ = require('jquery');
let cryptoUI = require('./htmlservice/cryptocontrolui');
let newsUI = require('./htmlservice/newsapiui');
let panicUI = require('./htmlservice/cryptopanicui');
let socialUI = require('./htmlservice/socialui');
let cryptoPrice = require('./pipeline/visualpipeline').getCryptoDataInHighChartsFormat;
const Highcharts = require('highcharts')


$(document).on('click', '#searchNews', function() {
  var selectedSource = $('#newsSelector').find(":selected").val();
  if (selectedSource == 'cryptopanic') {
    panicUI.getCryptoPanicUI().then(function(parsedJson) {
        $("#newsContainer").html(parsedJson);
    }).catch(function(error) {
      console.log(error);
    });
  } else if (selectedSource == "cryptocontrol") {
    cryptoUI.getCryptoControlNewsHTMLUI().then(function(parsedJson) {
        $("#newsContainer").html(parsedJson);
    }).catch(function(error) {
      console.log(error);
    });
  } else if (selectedSource == "cryptonews") {
    newsUI.getNewsAPIUI().then(function(parsedJson) {
        $("#newsContainer").html(parsedJson);
    }).catch(function(error) {
      console.log(error);
    });
  }
});

$(document).on('click', '#searchSocial', function() {
  var selectedSource = $('#socialSelector').find(":selected").val();
    socialUI.getSocialHTMLUI(selectedSource).then(function(parsedJson) {
        $("#socialContainer").html(parsedJson);
    }).catch(function(error) {
      console.log(error);
    });
});

$(document).on('click', '#searchVisual', function() {
  var selectedSource = $('#visualSelector').find(":selected").val();
  cryptoPrice(selectedSource).then(function(responseJson) {
    console.log(responseJson);
    Highcharts.chart('visualContainer',responseJson);
  }).catch(function(error) {
    console.log(error);
  });
});
