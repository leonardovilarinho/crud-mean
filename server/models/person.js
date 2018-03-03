const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  /* Campo de nome, é obrigatório e não permitido números */
  name: {
    type: String,
    required: [true, 'O nome não pode conter números.'],
    validate: {
      validator: value => !/\d/.test(value),
      message: 'Por favor, preencha com um número sem números!'
    }
  },

  /* Campo de email, é obrigatório e permitido apenas emails válidos */
  email: {
    type: String,
    required: [true, 'O email deve ser um email válido.'],
    validate: {
      validator: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        return pattern.test(value)
      },
      message: 'Por favor, preencha com um email válido!'
    }
  },

  /* Campo de data de nascimento, é obrigatório e permite apenas datas passadas */
  birth: {
    type: Date,
    required: [true, 'A data de nascimento deve ser anterior a hoje.'],
    validate: {
      validator: value => value < new Date(),
      message: 'Por favor, preencha com uma data que já passou!'
    }
  },

  /* Campo de telefone, é obrigatório e permite apenas a mascara 00 00000-0000 */
  phone: {
    type: String,
    required: [true, 'O número do telefone deve ser um número com 11 dígitos.'],
    validate: {
      validator: value => /\d{2} \d{5}-\d{4}/.test(value),
      message:
        'Por favor, preencha o númedo de telefone com 11 dígitos, ex: 00 00000-0000!'
    }
  }
})

/**
 * Verifica se já existe uma pessoa com o mesmo email enviado por parâmetro
 */
schema.statics.existsWithEmail = async function (email) {
  const exists = await this.find({ email }).exec()
  return exists.length > 0
}

module.exports = mongoose.model('Person', schema)
