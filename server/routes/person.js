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
      if (await Person.existsWithEmail(req.body.email)) {
        return res.status(500).json({ error: 'Essa pessoa já existe no sistema.' })
      }

      await Person.create(req.body)
      return res.status(200).json({ error: false })
    } catch (error) {
      return res.status(500).json({ error: _(error.errors).first().message })
    }
  })

  /**
   * DELETE:/api/people/:id usada para apagar uma pessoa com o
   * id informado por parâmetro, em todo cso o json retornado é
   * {json}, porém no caso de sucesso ele será falso
   */
  app.delete('/api/people/:id', async (req, res) => {
    try {
      await Person.findByIdAndRemove(req.params.id).exec()
      return res.status(200).json({ error: false })
    } catch (error) {
      return res.status(200).json({ error })
    }
  })

  /**
   * PUT:/api/people/:id é responsável por editar uma pessoa com
   * o id passado por parâmetro, caso o novo email pertença a uma
   * pessoa já existente é retornado um json {error}, em caso de sucesso
   * o mesmo json é retornado com o erro falso
   */
  app.put('/api/people/:id', async (req, res) => {
    try {
      const { email } = req.body
      const person = await Person.findById(req.params.id).exec()

      if (person.email !== email && await Person.existsWithEmail(email)) {
        return res.status(500).json({ error: 'Essa pessoa já existe no sistema.' })
      }

      await Person.findByIdAndUpdate(req.params.id, req.body).exec()
      return res.status(200).json({ error: false })
    } catch (error) {
      return res.status(200).json({ error })
    }
  })
}
