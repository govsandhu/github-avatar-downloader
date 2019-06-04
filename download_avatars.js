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
        if (res.statusCode === 200) {
            var newObj = JSON.parse(body);
            cb(err, newObj);
        } else {
            console.log(res.statusCode + ": Repo not found")
        }
    });
}

function downloadImageByURL(url, filePath) {
    request.get(url)
        .pipe(fs.createWriteStream(filePath))
}

var owner = process.argv[2]
var repo = process.argv[3]

if (!repo) {
    console.log("Errors: Missing parameter");
} else {
    getRepoContributors(owner, repo, function(err, result) {

        var avatarURL = "";
        var login = "";
        for (i of result) {
            var avatarUrl = i.avatar_url
            var filePath = "avatars/" + i.login + ".jpg"
            downloadImageByURL(avatarUrl, filePath)

        }
    });
}