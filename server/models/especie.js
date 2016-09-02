var mongoose = require('mongoose')

var especieSchema = mongoose.Schema(
  {
    singular: String,
    plural: String
  },
  {
    collection: 'especies'
  }
)

module.exports = mongoose.model('Especie', especieSchema)
