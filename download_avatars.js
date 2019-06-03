var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

}

getRepoContributors("https://github.com/nodejs/node", "node", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});