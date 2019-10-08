import path from 'path'

Parse.Cloud.define('hello functions', () => {
  return 'Hi functions'
})

Parse.Cloud.define('whoami', req => {
  const name = req.params.name
  const money = req.params.money

  const result = `Hello. ${name}! You will earn $${money}!!!`
  return result
})

Parse.Cloud.define('getItemList', async () => {
  const Character = Parse.Object.extend('Character') // Get class from database
  const query = new Parse.Query(Character) // Make query from class

  try {
    const result = await query.find() // Get all datas
    return result
  } catch (error) {
    throw error
  }
})
