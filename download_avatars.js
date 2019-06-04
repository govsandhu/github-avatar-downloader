var request = require('request');
var tokeKey = require('./secrets');
var fs = require('fs');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        'Authorization': 'token ' + tokeKey.GITHUB_TOKEN
      }
    };

   request(options, function(err, res, body) {
    var newObj = JSON.parse(body);
    cb(err, newObj);
   });





}

function downloadImageByURL(url, filePath) {
      request.get(url)
      .pipe(fs.createWriteStream(filePath))
}

// Below is just to call the function while building.
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  var avatarURL = "";
  var login = "";

  for(i of result) {
    var avatarUrl = i.avatar_url
    var filePath = "avatars/" + i.login + ".jpg"
    downloadImageByURL(avatarUrl, filePath)

  }
});





