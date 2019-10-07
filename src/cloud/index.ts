require('./functions')
require('./triggers')
require('./jobs')

Parse.Cloud.define('hello', () => {
  return 'Hi'
})
