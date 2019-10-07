'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ParseServer = require('parse-server').ParseServer;
const express_1 = __importDefault(require("express"));
const parse_dashboard_1 = __importDefault(require("parse-dashboard"));
const path_1 = __importDefault(require("path"));
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
const app = express_1.default();
// mongodb://username:password@ggg.com:27017/dbname
let databaseURI = process.env.LOCAL_DB_URI;
if (process.env.NODE_ENV !== 'local') {
    databaseURI = `postgres://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
}
// Specify the connection string for your mongodb database
// and the location to your Parse cloud code
const api = new ParseServer({
    databaseURI,
    cloud: process.env.CLOUD,
    appId: process.env.APP_ID,
    masterKey: process.env.MASTER_KEY,
    fileKey: process.env.FILE_KEY,
    serverURL: 'http://localhost:1337/parse',
    // enableAnonymousUsers: true,
    liveQuery: {
    // classNames: ['Alram'],
    },
});
// Serve static assets from the /public folder
app.use('/', express_1.default.static(path_1.default.join(__dirname, '/public')));
// if (process.env.NODE_ENV !== 'local') {
const dashboardConfig = {
    apps: [
        {
            serverURL: process.env.DASHBOARD_SERVERURL || 'http://localhost:1337/parse',
            appId: process.env.APP_ID,
            masterKey: process.env.MASTER_KEY,
            appName: process.env.APPNAME,
            supportedPushLocales: ['en', 'kr'],
        },
    ],
    users: [
        {
            user: process.env.DASHBOARD_ID,
            pass: process.env.DASHBOARD_PASSWORD,
        },
    ],
};
const dashboard = new parse_dashboard_1.default(dashboardConfig, {
    allowInsecureHTTP: true,
}); //  only for test
app.use('/dashboard', dashboard);
// }
// Serve the Parse API on the /parse URL prefix
app.use(process.env.PARSE_API_PREFIX, api);
// Hello world
// app.get('/', function(req, res) {
//   res.status(200).send('Init.');
// });
const httpServer = require('http').createServer(app); // Need for livequery
const port = process.env.PORT;
httpServer.listen(port, function () {
    console.log('parse-server running on port %s', port);
});
ParseServer.createLiveQueryServer(httpServer);
//# sourceMappingURL=index.js.map