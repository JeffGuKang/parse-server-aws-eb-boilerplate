Parse.Cloud.define('hello functions', function(req, res) {
  return 'Hi functions';
});

Parse.Cloud.define('whoami', function(req, res) {
  const name = req.params.name;
  const money = req.params.money;

  const result = `Hello. ${name}! You will earn $${money}!!!`
  return result;
});