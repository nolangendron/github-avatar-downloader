var request = require('request');
var fs = require('fs');
var github_token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + github_token.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var contributors = JSON.parse(body);
    cb(err, contributors);

  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  result.forEach(function(element) {
    downloadImageByURL(element.avatar_url, 'avatars/' + element.login + '.jpg');
  })

});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}




