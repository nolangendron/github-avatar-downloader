var request = require('request');
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
  console.log("Errors:", err);
  for (let i = 0; i < result.length; i++) {
  console.log("Result:", result[i].avatar_url);
  }
});


