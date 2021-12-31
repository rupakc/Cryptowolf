
$(document).on('click', '#social', function() {
  $('#tabContainer').load('views/social.html');
});

$(document).on('click', '#news', function() {
  $('#tabContainer').load('views/news.html');
});

$(document).on('click', '#visual', function() {
  $('#tabContainer').load('views/visual.html');
});

$(document).ready(function() {
  $('#tabContainer').load('views/news.html');
});
