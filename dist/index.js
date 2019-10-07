'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
const path = require('path');
// var S3Adapter = require('@parse/s3-files-adapter');
// var s3Adapter = new S3Adapter(
//   process.env.S3KEY,
//   process.env.S3SECRET,
//   process.env.S3NAME,
//   {
//     region: process.env.S3REGION,
//     directAccess: true,
//     bucketPrefix: process.env.S3PREFIX,,
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
    cloud: process.env.CLOUD,
    appId: process.env.APP_ID,
    masterKey: process.env.MAASTER_KEY,
    fileKey: process.env.FILE_KEY,
    serverURL: 'http://localhost:1337/parse',
    // enableAnonymousUsers: true,
    liveQuery: {
    // classNames: ['Alram'],
    },
});
// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')));
// if (process.env.NODE_ENV !== 'local') {
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
            "user": nconf.get('dashboard-userId'),
            "pass": nconf.get('dashboard-userPassword')
        },
    ]
};
var dashboard = new ParseDashboard(config, { allowInsecureHTTP: true }); //  only for test
app.use('/dashboard', dashboard);
// }
// Serve the Parse API on the /parse URL prefix
app.use(nconf.get('parseAPIPrefix'), api);
// Hello world
// app.get('/', function(req, res) {
//   res.status(200).send('Init.');
// });
var httpServer = require('http').createServer(app); // Need for livequery
var port = nconf.get('port');
httpServer.listen(port, function () {
    console.log('parse-server running on port %s', port);
});
ParseServer.createLiveQueryServer(httpServer);
//# sourceMappingURL=index.js.map