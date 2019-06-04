var request = require('request');
var tokeKey = require('./secrets')

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
   var options = {
      url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
      headers: {
        'User-Agent': 'request',
        Authorization: 'token' + tokeKey
      }
    };
   request(options, function(err, res, body) {
    cb(err, body);
   });
}




// Below is just to call the function while building.
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});

