var mongoose = require('mongoose')

var especieSchema = mongoose.Schema(
  {
    _id: String,
    singular: String,
    plural: String
  },
  {
    collection: 'especies'
  }
)

module.exports = mongoose.model('Especie', especieSchema)
