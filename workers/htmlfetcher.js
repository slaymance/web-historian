// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var https = require('https');
var fs = require('fs');
var path = require('path');
var archives = require('../helpers/archive-helpers.js');

var fetchSite = function(url) {
  https.get(url, response => {
    response.setEncoding('utf8');
    var body = '';
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      var pathname = path.join(__dirname, '../archives/', url, index.html); // FIX ME?
      fs.writeFile(pathname, body, err => {
      });
    });
  });
};

var processList = function(url, array) {
  var names = array.map((name) => {
    return archives.translate(name);
  });
  for (var i = 0; i < names.length; i++) {
    if (!fs.existsSync(basePath)) {
      fs.mkdirSync(basePath);
    }
  }
};

// check the dl list
// archives.readListOfUrls('', processList);

// console.log('Let\'s CRON it up');

// initialize the folder/file structure
// fetch the files
// write to the archive folder



exports.processList = processList;
exports.fetchSite = fetchSite;