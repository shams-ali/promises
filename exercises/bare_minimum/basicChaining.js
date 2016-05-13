/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var func = require('./promisification.js');
var promFS = Promise.promisifyAll(require('fs'));

var nodeStyle = require('./callbackReview.js');
var pluckFirstLineFromFileAsync = Promise.promisify(nodeStyle.pluckFirstLineFromFile);
var getStatusCodeAsync = Promise.promisify(nodeStyle.getStatusCode);


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO
  console.log('readFilePath is ', readFilePath);
  return pluckFirstLineFromFileAsync(readFilePath)
    .then( function(result) {
      return func.getGitHubProfileAsync(result);
    })
    .then( function(result) {
      return promFS.writeFileAsync(writeFilePath, JSON.stringify(result));
    })
    .catch( function(err) {
      console.log(err);
    });  
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
