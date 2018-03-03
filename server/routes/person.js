const People = require('../models/people')

module.exports = app => {

  app.get("/api/people", (req, res) => {
    return res.status(200).json({msg : 'Hello'})
  })

}
