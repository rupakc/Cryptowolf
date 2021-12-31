const newsApiPipeline = require('../pipeline/newsapipipeline').newsApiPipeline;

var getNewsAPIHTML = function (parsedJsonList) {
  var prefix = `<div class='card'>
                  <div class='card-content'>
                    <div class='media'>
                      <div class='media-left'>
                        <figure class='image is-48x48'>`;

    var renderedHTML = "";

    for (let i = 0; i < parsedJsonList.length; i++) {
        var json = parsedJsonList[i];
        renderedHTML = renderedHTML + prefix;
        renderedHTML = renderedHTML + `<img src=` + `'` + json.urlToImage + `'` +` alt='Image'>` + `</figure>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='media-content'>`;
        renderedHTML = renderedHTML + `<p class='title is-4'>` + json.title + `</p>` + `<p class='subtitle is-6'>` + `</p>` + `</div>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='content'>` + json.description + ` <a href=` + `'` + json.url + `'` + `target='_blank'` + `> Link </a>` +  `<br>` + '\n';
        renderedHTML = renderedHTML + `<time datetime='2016-1-1'>` + json.publishedAt + `</time>` + `</div>` + `</div>` + `</div>` + `<hr>` +'\n';
    }

    return  renderedHTML;
}

var getNewsAPIUI = function() {
  let parsedNewsPromise = newsApiPipeline();
  return new Promise(function(resolve, reject) {
    parsedNewsPromise.then(function(parsedResultList) {
      let renderedHTML = getNewsAPIHTML(parsedResultList);
      resolve(renderedHTML);
    }).catch(function(error) {
        console.log(error);
        reject(error);
    });
  });
}

module.exports = {
  getNewsAPIUI: getNewsAPIUI
};
