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
  var urlAvatar = '';
  var filePath = '';
  for (let i = 0; i < result.length; i++) {
    urlAvatar = result[i].avatar_url;
    filePath = result[i].login;
  }
  return downloadImageByURL(urlAvatar, filePath);
});

function downloadImageByURL(url, filePath) {
  request.get(url + '/' + filePath)
    .on('error', function (err) {
      throw err;
    })
    .on('response', function (response) {
      console.log('Response Status Code: ', response.statusCode);
    })
    .pipe(fs.createWriteStream('./images.jpg'))
}




