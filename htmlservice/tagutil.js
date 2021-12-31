
var getTagHTML = function(tagList) {
  let startTag = "<div class='has-text-centered'>";
  let endTag = "</div>";
  let tagString = "";
  for (let i = 0; i < tagList.length; i++) {
    tagString += "<span class='tag is-rounded'>" + tagList[i] + "</span>" + "\n";
  }
  return startTag + "\n" + tagString + endTag + "\n";
}

module.exports = {
  getTagHTML: getTagHTML
}
