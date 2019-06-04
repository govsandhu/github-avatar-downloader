var request = require('request');
var tokeKey = require('./secrets')
console.log(tokeKey)

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




// Below is just to call the function while building.
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for(i of result) {
    console.log("Result:" + i.avatar_url);
  }
});

