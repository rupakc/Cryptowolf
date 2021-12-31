const cryptocontrol = require('../pipeline/cryptocontrolpipeline');
const tagutil = require('./tagutil');

var getCryptoControlNewsHTML = function (parsedJsonList) {
  var prefix = `<div class='card'>
                  <div class='card-content'>
                    <div class='media'>
                      <div class='media-left'>
                        <figure class='image is-48x48'>`;

    var renderedHTML = "";

    for (let i = 0; i < parsedJsonList.length; i++) {
        var json = parsedJsonList[i];
        renderedHTML = renderedHTML + prefix;
        renderedHTML = renderedHTML + `<img src=` + `'` + json.thumbnail + `'` +` alt='Image'>` + `</figure>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='media-content'>`;
        renderedHTML = renderedHTML + `<p class='title is-4'>` + json.title + `</p>` + `<p class='subtitle is-6'>` +  json.activityHotness + `</p>` + `</div>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='content'>` + json.description + ` <a href=` + `'` + json.url + `'` + `target='_blank'` + `> Link </a>` +  `<br>` + '\n';
        if (json.coinList.length != 0) {
          renderedHTML = renderedHTML + tagutil.getTagHTML(json.coinList);
        }
        renderedHTML = renderedHTML + `<time datetime='2016-1-1'>` + json.publishedAt + `</time>` + `</div>` + `</div>` + `</div>` + `<hr>` +'\n';
    }

    return  renderedHTML;
}

var getCryptoControlNewsHTMLUI = function() {
    let cryptoNewsPromise = cryptocontrol.cryptocontrolNewsPipeline();
    return new Promise(function(resolve, reject) {
      cryptoNewsPromise.then(function(parsedResponseList) {
        var newsHTML = getCryptoControlNewsHTML(parsedResponseList);
        resolve(newsHTML);
      }).catch(function(error) {
        console.log(error);
        reject(error);
      });
    });
}

module.exports = {
  getCryptoControlNewsHTMLUI: getCryptoControlNewsHTMLUI
};
