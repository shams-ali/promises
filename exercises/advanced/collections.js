/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var fs = require('fs');
var Promise = require('bluebird');
var promFS = Promise.promisifyAll(require('fs'));

var nodeStyle = require('../bare_minimum/callbackReview.js');
var pluckFirstLineFromFileAsync = Promise.promisify(nodeStyle.pluckFirstLineFromFile);
var getStatusCodeAsync = Promise.promisify(nodeStyle.getStatusCode);

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  var promises = [];
  //console.log(filePaths, '<--- filePaths');
  filePaths.forEach( function(filepath) {
    promises.push(pluckFirstLineFromFileAsync(filepath));
  });
  console.log('this is promise array --->', promises);
  return Promise.all( promises )
    .then( (result) => {
      console.log('result outside of Promise.all ---->', result);
      result = result.join('\n');
      return promFS.writeFileAsync(writePath, result);
    })
    .catch(err => console.log(err));
};
// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};