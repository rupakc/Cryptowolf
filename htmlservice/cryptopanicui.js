const cryptoPanicPipeline = require('../pipeline/cryptopanicpipeline').cryptoPanicPipeline;
const tagutil = require('./tagutil');

var getCryptoPanicHTML = function(parsedJsonList) {
  var prefix = `<div class='card'>
                  <div class='card-content'>
                    <div class='media'>
                      <div class='media-left'>
                        <figure class='image is-48x48'>`;

    var renderedHTML = "";

    for (let i = 0; i < parsedJsonList.length; i++) {
        var json = parsedJsonList[i];
        renderedHTML = renderedHTML + prefix;
        renderedHTML = renderedHTML + `<img src=` + `'` + './images/cryptowolf.jpg' + `'` +` alt='Image'>` + `</figure>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='media-content'>`;
        renderedHTML = renderedHTML + `<p class='title is-4'>` + json.title + `</p>` + `<p class='subtitle is-6'>` +  json.domain + `</p>` + `</div>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='content'>` + ` <a href=` + `'` + json.url + `'` + `target='_blank'` + `> Link </a>` +  `<br>` + '\n';
        if (json.coinList.length != 0) {
          renderedHTML = renderedHTML + tagutil.getTagHTML(json.coinList);
        }
        renderedHTML = renderedHTML + `<time datetime='2016-1-1'>` + json.publishedAt + `</time>` + `</div>` + `</div>` + `</div>` + `<hr>` +'\n';
    }

    return  renderedHTML;
}

var getCryptoPanicUI = function() {
  let cryptoPanicPromise = cryptoPanicPipeline();
  return new Promise(function(resolve, reject) {
    cryptoPanicPromise.then(function(result) {
      let parsedHTML = getCryptoPanicHTML(result);
      resolve(parsedHTML);
    }).catch(function(error) {
      console.log(error);
      reject(error);
    });
  });
};

module.exports = {
  getCryptoPanicUI: getCryptoPanicUI
};
