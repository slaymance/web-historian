var path = require('path');
var archive = require('../helpers/archive-helpers');
var url = require('url');
var fs = require('fs');
var queryString = require('querystring');
// require more modules/folders here!

var requestMethods = {
  'GET': function(req, res, parsedUrl) {
    var pathname = parsedUrl.pathname;
    var dirName = queryString.parse(parsedUrl.query).url;

    if (pathname === '/' && !dirName) {
      fs.readFile('web/public/index.html', 'utf8', (err, data) => {
        res.writeHead(requestMethods.statusCode, requestMethods.headers);
        res.end(data);
      });
    } else if (pathname === '/styles.css') {
      fs.readFile('web/public/styles.css', 'utf8', (err, data) => {
        res.writeHead(requestMethods.statusCode, {'Content-Type': 'text/css'});
        res.end(data);
      });
    } else {
      var searchPath = path.join(archive.paths.archivedSites, dirName);
      //////////////// refactor with directory name////////////////////////////////////////////////////
      fs.exists(searchPath, (exists) => {
        if (exists) {
          fs.readFile(searchPath, 'utf8', (err, data) => {
            res.writeHead(requestMethods.statusCode, requestMethods.headers);
            res.end(data);
          });
        } else {
          res.writeHead(404, requestMethods.headers);
          res.end();
          archive.readListOfUrls(dirName, archive.isUrlInList);
        }
      });
    }
  },
  'POST': function(req, res, parsedUrl) {
    var testSites = path.join(__dirname, '../test/testdata/sites.txt');
    var fileArray = fs.readFile(testSites, 'utf8', (err, data) => {
      res.writeHead(302, requestMethods.headers);
      res.end();
      archive.addUrlToList(req.url, data.split('\n'), () => {}, testSites);
    });
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
