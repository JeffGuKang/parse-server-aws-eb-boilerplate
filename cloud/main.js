require('./functions');
require('./triggers');
require('./jobs');

// Globals
global.Parse = Parse;

Parse.Cloud.define('hello', function(req, res) {
  return 'Hi';
});