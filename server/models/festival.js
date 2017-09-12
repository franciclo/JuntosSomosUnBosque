var mongoose = require('mongoose')

var especieSchema = mongoose.Schema(
  {
    titulo: String,
    descripcion: String,
    fecha: String,
    locacion: String
  },
  {
    collection: 'festivales'
  }
)

module.exports = mongoose.model('Festival', especieSchema)
