const Person = require('../models/person')

module.exports = app => {
  app.get('/api/people', async (req, res) => {
    try {
      const people = await Person.find({}).select('name').exec()
      return res.status(200).json({ success: true, people })
    } catch (error) {
      return res.status(500).json({ error })
    }
  })
}
