// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.

var archives = require('../helpers/archive-helpers.js');

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
archives.readListOfUrls('', processList);



// initialize the folder/file structure
// fetch the files
// write to the archive folder



exports.processList = processList;