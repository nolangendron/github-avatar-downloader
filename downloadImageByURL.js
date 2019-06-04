// To test this function

var request = require('request');
var fs = require('fs');

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

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")