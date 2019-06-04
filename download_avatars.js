var request = require('request');
var fs = require('fs');
var github_token = require('./secrets');
var args = process.argv.slice(2);

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
    if (res.statusCode !== 200) {
      console.log('Must enter a valid repo owner and repo name.')
    } else {
      var contributors = JSON.parse(body);
      cb(err, contributors);
      }
  });
}

getRepoContributors(args[0], args[1], function(err, result) {
  result.forEach(function(element) {
    downloadImageByURL(element.avatar_url, 'avatars/' + element.login + '.jpg');
  })
});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .pipe(fs.createWriteStream(filePath))
}




