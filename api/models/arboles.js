var mongoose = require('mongoose')

var arbolesSchema = mongoose.Schema({
  singular: String,
  plural: String
})

module.exports = mongoose.model('Arboles', arbolesSchema)
