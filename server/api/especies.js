var Especie = require('../models/especie')

module.exports = function (req, res) {
  Especie.find({}, function (err, especies) {
    if (err) {
      return res.json(
        {
          success: false,
          error: 'Error interno'
        })
    }
    if (especies.length > 0) {
      return res.json(
        {
          success: true,
          result: especies.map(function (especie) {
            return {
              label: especie.singular,
              id: especie.id
            }
          })
        })
    } else {
      return res.json(
        {
          success: false,
          error: 'No hay especies'
        })
    }
  })
}

// var especiesData = require('./especies.json')
// var Especie = require('../models/especie')

// module.exports.populate = function (req, res) {
//   Especie.find({}, function (err, especies) {
//     if (err) {
//       console.log('Especies populate error')
//       console.log(err)
//       return res.json({error: err})
//     }
//     if (especies.length > 0) {
//       console.log('ya hay ', especies.length, 'especies')
//       return res.json({error: 'ya hay ' + especies.length + ' especies'})
//     }
//     especiesData.forEach(function (especie) {
//       var nueva = new Especie()
//       nueva.singular = especie.singular
//       nueva.plural = especie.plural
//       nueva.save(function (err) {
//         if (err) {
//           console.log('fallo al guardar nueva especie')
//         }
//       })
//     })
//   })
// }
