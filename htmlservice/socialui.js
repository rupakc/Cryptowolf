const social = require('../pipeline/socialpipeline');
const utils = require('../utils/commonutils');

var getRedditHTML = function (parsedJsonList) {
  var prefix = `<div class='card'>
                  <div class='card-content'>
                    <div class='media'>
                      <div class='media-left'>
                        <figure class='image is-48x48'>`;

    var renderedHTML = "";

    for (let i = 0; i < parsedJsonList.length; i++) {
        var json = parsedJsonList[i];
        var htmlString = "";
        renderedHTML = renderedHTML + prefix;
        renderedHTML = renderedHTML + `<img src=` + `'` + './images/reddit.jpg' + `'` + ` alt='Image'>` + `</figure>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='media-content'>`;
        renderedHTML = renderedHTML + `<p class='title is-4'>` + json.title + `</p>` + `<p class='subtitle is-6'>` + json.subreddit  +`</p>` + `</div>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='content'>` + json.description + ` <a href=` + `'` + json.url + `'` + `target='_blank'` + `> Link </a>` +  `<br>` + '\n';
        htmlString = utils.getJSONFormatString({"ActivityHotness": json.activityHotness, "Comments": json.comments, "Downvotes": json.downvotes, "Upvotes": json.upvotes });
        renderedHTML = renderedHTML +  `<p>` + htmlString + `</p>`;
        renderedHTML = renderedHTML + `<time datetime='2016-1-1'>` + json.publishedAt + `</time>` + `</div>` + `</div>` + `</div>` + `<hr>` +'\n';
    }
    return  renderedHTML;
}

var getTwitterHTML = function (parsedJsonList) {
  var prefix = `<div class='card'>
                  <div class='card-content'>
                    <div class='media'>
                      <div class='media-left'>
                        <figure class='image is-48x48'>`;

    var renderedHTML = "";

    for (let i = 0; i < parsedJsonList.length; i++) {
        var json = parsedJsonList[i];
        var htmlString = "";
        renderedHTML = renderedHTML + prefix;
        renderedHTML = renderedHTML + `<img src=` + `'` + './images/twitter_icon.png' + `'` + ` alt='Image'>` + `</figure>` + `</div>`;
        renderedHTML = renderedHTML + `<div class='media-content'>`;
        renderedHTML = renderedHTML + `<p class='title is-4'>` + json.text + `</p>` + `<p class='subtitle is-6'>` + json.username  +`</p>` + `</div>` + `</div>`;
        htmlString = utils.getJSONFormatString({"RetweetCount": json.retweetCount,"FavoriteCount": json.favoriteCount});
        renderedHTML = renderedHTML + `<div class='content'>` + `<p>` + htmlString + `</p>` + `<br>` + '\n';
        renderedHTML = renderedHTML + `<time datetime='2016-1-1'>` + json.publishedAt + `</time>` + `</div>` + `</div>` + `</div>` + `<hr>` +'\n';
    }
    return  renderedHTML;
}

var getSocialHTMLUI = function(channelName) {
    let socialPromise = social.getParsedSocialResponseData(channelName);
    return new Promise(function(resolve, reject) {
      socialPromise.then(function(parsedResponseList) {
        if (channelName == "reddit") {
          var socialHTML = getRedditHTML(parsedResponseList);
        } else if (channelName == "twitter") {
          var socialHTML = getTwitterHTML(parsedResponseList);
        }
        resolve(socialHTML);
      }).catch(function(error) {
        console.log(error);
        reject(error);
      });
    });
}

module.exports = {
  getSocialHTMLUI: getSocialHTMLUI
};
