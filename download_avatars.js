var request = require('request');
var github_token = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
  var url = "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors";
    headers: {
      'User-Agent': 'request',
      'Authorization': "token " + github_token
    }
  };

  request(url, function(err, res, body) {
    cb(err, body);
  })

}

getRepoContributors("https://api.github.com/repos/jquery/jquery/contributors", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


