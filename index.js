'use strict';

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var nconf = require('nconf');
const path = require('path');

nconf.argv().env().file({file: './config/default.json'});

// var S3Adapter = require('@parse/s3-files-adapter');
// var s3Adapter = new S3Adapter(
//   nconf.get('s3key'),
//   nconf.get('s3secret'),
//   nconf.get('s3name'),
//   {
//     region: nconf.get('s3region'),
//     directAccess: true,
//     bucketPrefix: 'photos/',
//   }
// );

var app = express();

// mongodb://username:password@ggg.com:27017/dbname
var databaseURI = nconf.get('localDatabaseURI');
if (process.env.NODE_ENV !== 'local') {
  databaseURI = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
}
// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
var api = new ParseServer({
  databaseURI,
  cloud: nconf.get('cloud'),
  appId: nconf.get('appId'),
  masterKey: nconf.get('masterKey'),
  fileKey: nconf.get('fileKey'),
  serverURL: 'http://localhost:1337/parse',  // Don't forget to add this line to change port or url
  // enableAnonymousUsers: true,
  liveQuery: {
    // classNames: ['Alram'],
  },
  // filesAdapter: s3Adapter
});


// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')))

if (process.env.NODE_ENV !== 'gg') {
  const config = {
    "apps": [
      {
        "serverURL": nconf.get('dashboard-serverURL'),
        "appId": nconf.get('appId'),
        "masterKey": nconf.get('masterKey'),
        "appName": nconf.get('appname'),
        "supportedPushLocales": ["en", "kr"]
      },
    ],
    "users": [
      {
        "user": nconf.get('dashboard-id'),
        "pass": nconf.get('dashboard-password')
      },
    ]
  };
  var dashboard = new ParseDashboard(config, {allowInsecureHTTP: true}); //  only for test

  app.use('/dashboard', dashboard);
}

// Serve the Parse API on the /parse URL prefix
app.use(nconf.get('parseAPIPrefix'), api);

// Hello world
// app.get('/', function(req, res) {
//   res.status(200).send('Init.');
// });

var httpServer = require('http').createServer(app); // Need for livequery
var port = nconf.get('port');
httpServer.listen(port, function() {
  console.log('parse-server running on port %s', port);
});

ParseServer.createLiveQueryServer(httpServer);
