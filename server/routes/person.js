const _ = require('lodash')
const Person = require('../models/person')

module.exports = app => {
  /**
   * GET:/api/people é responsável por pegar todas as pessoas do
   * banco de dados e retornar json {error, people}, em caso de
   * erro {error}
   */
  app.get('/api/people', async (req, res) => {
    try {
      const people = await Person.find({}).select('name email phone birth').exec()
      return res.status(200).json({ error: false, people })
    } catch (error) {
      return res.status(500).json({ error })
    }
  })

  /**
   * POST:/api/people é feita para criar uma pessoa na agenda,
   * em caso de sucesso é retornado {error} (com error falso),
   * em caso de falha ou já existência de pessoa com o mesmo email
   * é retornando o json {error}
   */
  app.post('/api/people', async (req, res) => {
    try {
      const exists = await Person.find({email: req.body.email}).exec()
      if (_(exists).size() > 0) {
        return res.status(500).json({ error: 'Essa pessoa já existe no sistema.' })
      }

      await Person.create(req.body)
      return res.status(200).json({ error: false })
    } catch (error) {
      return res.status(500).json({ error: _(error.errors).first().message })
    }
  })
}
