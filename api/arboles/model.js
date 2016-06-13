var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arbolSchema = new Schema({
  userId: String,
  coord: [Number, Number],
  created_at: Date
});

arbolSchema.pre('save', function(next) {
  var currentDate = new Date();
  this.created_at = currentDate;
  next();
});

var Arbol = mongoose.model('Arbol', arbolSchema);

module.exports = Arbol;