var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
// require more modules/folders here!



var requestMethods = {
  'GET': function(req, res, parsedUrl) {
    var pathname = parsedUrl.pathname;

    if (pathname === '/') {
      fs.readFile('web/public/index.html', 'utf8', (err, data) => {
        res.writeHead(requestMethods.statusCode, requestMethods.headers);
        res.end(data);
      });
    } else {
      var searchPath = path.join(archive.paths.archivedSites, pathname);
      fs.exists(searchPath, (exists) => {
        if (exists) {
          // TODO
        } else {
          res.writeHead(404, requestMethods.headers);
          res.end();
        }
      });
    }
  },
  'OPTIONS': function(req, res, parsedUrl) {

  },
  'headers': {
    'Content-Type': 'text/html'
  },
  'statusCode': 200
};

exports.handleRequest = function (req, res) {
  var parsedUrl = url.parse(req.url);
  requestMethods[req.method](req, res, parsedUrl);

  // res.end(archive.paths.list);
  // check request to see if we have the file archived
    // yes? serve it
    // no? add file to dl list
};
