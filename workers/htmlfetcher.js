// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var https = require('https');
var fs = require('fs');
var path = require('path');
var archives = require('../helpers/archive-helpers.js');
var finished = false;
var written = false;

var parseHtml = (body, dirName) => {
  // copy body
  // split string by src="     www.lllll.com"..............................
  var bodyArray = body.split('src="');
  var srcArray = [];
  for (var i = 1; i < bodyArray.length; i++) {
    srcArray.push(bodyArray[i].slice(0, bodyArray.indexOf('"')));
  }

  for (var j = 0; j < srcArray.length; j++) {
    // go to processed dirName/srcArray[j] (GET)
      // successful callback =>
        // write the returned file to path.join(dirName, srcArray[j]);
  }

  // search body for "src="
  // push the value between the quotes to an array
  // splice out the src tag
  // repeat search until there are no more src tags

  // iterate through array
  // download each item
  // write to directory
};

var fetchSite = function(url, dirPath, list, index) {
  console.log(`https://${url}`);
  https.get(`https://${url}`, response => {
    response.setEncoding('utf8');
    var body = '';
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      var pathname = path.join(dirPath, '/index.html'); // FIX ME?
      fs.writeFile(pathname, body, err => {
        // only parse if no list is passed in
        // parse body for src tags
        if (!err) {
          list.splice(index, 1);
          if (index = list.length - 1) {
            fs.writeFile(path.join(__dirname, '../archives/sites.txt'), list);
          }
        }
      });
    });
  });
};

var processList = function(url, array) {
  var toDoList = array.slice();
  var names = array.map((name) => {
    return archives.translate(name);
  });
  var dirPath = path.join(__dirname, '../archives/');

  for (var i = 0; i < names.length; i++) {
    if (!fs.existsSync(dirPath + names[i])) {
      fs.mkdirSync(dirPath + names[i]);
    }
    fetchSite(names[i], path.join(dirPath, names[i]), toDoList, i);
  }
};

// check the dl list
archives.readListOfUrls('', processList);

// console.log('Let\'s CRON it up');

// initialize the folder/file structure
// fetch the files
// write to the archive folder



exports.processList = processList;
exports.fetchSite = fetchSite;