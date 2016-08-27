var mongoose = require('mongoose')

var voluntarioSchema = mongoose.Schema({
  nombre: String,
  apellido: String,
  mail: String,
  telefono: String,
  area: String,
  comentario: String
})

module.exports = mongoose.model('Voluntario', voluntarioSchema)
