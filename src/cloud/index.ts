require('./functions')
require('./jobs')
require('./triggers')

Parse.Cloud.define('hello', () => {
  return 'Hi'
})
