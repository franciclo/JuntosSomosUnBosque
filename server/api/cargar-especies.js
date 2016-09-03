var Especie = require('../models/especie')

module.exports = function (req, res) {
  Especie.find({}, function (err, especies) {
    if (err) {
      console.log('Especies populate error')
      console.log(err)
      return res.json({error: err})
    }
    if (especies.length > 0) {
      Especie.remove({}, function (err) {
        if (err) {
          console.log('error al borrar', err)
        }
        especiesData.forEach(function (especie) {
          var nueva = new Especie()
          nueva.singular = especie.singular
          nueva.plural = especie.plural
          nueva._id = especie._id
          nueva.save(function (err) {
            if (err) {
              console.log('fallo al guardar nueva especie', err)
            }
          })
        })
        res.json({success: true, message: 'cargo todo'})
      })
    } else {
      especiesData.forEach(function (especie) {
        var nueva = new Especie()
        nueva.singular = especie.singular
        nueva.plural = especie.plural
        nueva._id = especie._id
        nueva.save(function (err) {
          if (err) {
            console.log('fallo al guardar nueva especie', err)
          }
        })
      })
      res.json({success: true, message: 'termino la carga'})
    }
  })
}

var especiesData = [
  {
    _id: '57ca1c5cc104e3131eac57d9',
    plural: 'Aguaribay',
    singular: 'Aguaribay'
  },
  {
    _id: '57ca1c5cc104e3131eac57da',
    plural: 'Algarrobo',
    singular: 'Algarrobo'
  },
  {
    _id: '57ca1c5cc104e3131eac57db',
    plural: 'Chañar',
    singular: 'Chañar'
  },
  {
    _id: '57ca1c5cc104e3131eac57dc',
    plural: 'Coronillo',
    singular: 'Coronillo'
  },
  {
    _id: '57ca1c5cc104e3131eac57dd',
    plural: 'Espinillo',
    singular: 'Espinillo'
  },
  {
    _id: '57ca1c5cc104e3131eac57df',
    plural: 'Sombra de Toro',
    singular: 'Sombra de Toro'
  },
  {
    _id: '57ca1c5cc104e3131eac57de',
    plural: 'Sen de Campo',
    singular: 'Sen de Campo'
  },
  {
    _id: '57ca1c5cc104e3131eac57e0',
    plural: 'Tala',
    singular: 'Tala'
  },
  {
    _id: '57ca1c5cc104e3131eac57e1',
    plural: 'Algodonillo',
    singular: 'Algodonillo'
  },
  {
    _id: '57ca1c5cc104e3131eac57e4',
    plural: 'Blanquillo',
    singular: 'Blanquillo'
  },
  {
    _id: '57ca1c5cc104e3131eac57e2',
    plural: 'Anacahuita',
    singular: 'Anacahuita'
  },
  {
    _id: '57ca1c5cc104e3131eac57e3',
    plural: 'Azota Caballo',
    singular: 'Azota Caballo'
  },
  {
    _id: '57ca1c5cc104e3131eac57e5',
    plural: 'Bugre',
    singular: 'Bugre'
  },
  {
    _id: '57ca1c5cc104e3131eac57e6',
    plural: 'Canelón',
    singular: 'Canelón'
  },
  {
    _id: '57ca1c5cc104e3131eac57e9',
    plural: 'Chal Chal',
    singular: 'Chal Chal'
  },
  {
    _id: '57ca1c5cc104e3131eac57e7',
    plural: 'Carpinchera',
    singular: 'Carpinchera'
  },
  {
    _id: '57ca1c5cc104e3131eac57e8',
    plural: 'Ceibo',
    singular: 'Ceibo'
  },
  {
    _id: '57ca1c5cc104e3131eac57ea',
    plural: 'Curupí',
    singular: 'Curupí'
  },
  {
    _id: '57ca1c5cc104e3131eac57eb',
    plural: 'Durasznillo Blanco',
    singular: 'Durasznillo Blanco'
  },
  {
    _id: '57ca1c5cc104e3131eac57ee',
    plural: 'Higuerón',
    singular: 'Higuerón'
  },
  {
    _id: '57ca1c5cc104e3131eac57ec',
    plural: 'Flor de Seda',
    singular: 'Flor de Seda'
  },
  {
    _id: '57ca1c5cc104e3131eac57ed',
    plural: 'Fumo Bravo',
    singular: 'Fumo Bravo'
  },
  {
    _id: '57ca1c5cc104e3131eac57ef',
    plural: 'Ingá',
    singular: 'Ingá'
  },
  {
    _id: '57ca1c5cc104e3131eac57f0',
    plural: 'Laurel Criollo',
    singular: 'Laurel Criollo'
  },
  {
    _id: '57ca1c5cc104e3131eac57f3',
    plural: 'Ombú',
    singular: 'Ombú'
  },
  {
    _id: '57ca1c5cc104e3131eac57f1',
    plural: 'Mata Ojo',
    singular: 'Mata Ojo'
  },
  {
    _id: '57ca1c5cc104e3131eac57f2',
    plural: 'Murta',
    singular: 'Murta'
  },
  {
    _id: '57ca1c5cc104e3131eac57f4',
    plural: 'Palo Amarillo',
    singular: 'Palo Amarillo'
  },
  {
    _id: '57ca1c5cc104e3131eac57f5',
    plural: 'Pindó',
    singular: 'Pindó'
  },
  {
    _id: '57ca1c5cc104e3131eac57f8',
    plural: 'Salvia Azul',
    singular: 'Salvia Azul'
  },
  {
    _id: '57ca1c5cc104e3131eac57f6',
    plural: 'Rama Negra',
    singular: 'Rama Negra'
  },
  {
    _id: '57ca1c5cc104e3131eac57f7',
    plural: 'Rosa de Río',
    singular: 'Rosa de Río'
  },
  {
    _id: '57ca1c5cc104e3131eac57f9',
    plural: 'Sarandí Blanco',
    singular: 'Sarandí Blanco'
  },
  {
    _id: '57ca1c5cc104e3131eac57fa',
    plural: 'Sarandí Colorado',
    singular: 'Sarandí Colorado'
  },
  {
    _id: '57ca1c5cc104e3131eac57fd',
    plural: 'Tarumá',
    singular: 'Tarumá'
  },
  {
    _id: '57ca1c5cc104e3131eac57fe',
    plural: 'Tasi',
    singular: 'Tasi'
  },
  {
    _id: '57ca1c5cc104e3131eac57ff',
    plural: 'Tembetarí',
    singular: 'Tembetarí'
  },
  {
    _id: '57ca1c5cc104e3131eac5802',
    plural: 'Carquejilla',
    singular: 'Carquejilla'
  },
  {
    _id: '57ca1c5cc104e3131eac57fb',
    plural: 'Sauce Criollo',
    singular: 'Sauce Criollo'
  },
  {
    _id: '57ca1c5cc104e3131eac5803',
    plural: 'Ceibillo',
    singular: 'Ceibillo'
  },
  {
    _id: '57ca1c5cc104e3131eac5804',
    plural: 'Hediondillo',
    singular: 'Hediondillo'
  },
  {
    _id: '57ca1c5cc104e3131eac5807',
    plural: 'Malva de Monte',
    singular: 'Malva de Monte'
  },
  {
    _id: '57ca1c5cc104e3131eac5800',
    plural: 'Timbó',
    singular: 'Timbó'
  },
  {
    _id: '57ca1c5cc104e3131eac57fc',
    plural: 'Sauco',
    singular: 'Sauco'
  },
  {
    _id: '57ca1c5cc104e3131eac5808',
    plural: 'Malvavisco',
    singular: 'Malvavisco'
  },
  {
    _id: '57ca1c5cc104e3131eac5809',
    plural: 'Molle',
    singular: 'Molle'
  },
  {
    _id: '57ca1c5cc104e3131eac5805',
    plural: 'Lantana',
    singular: 'Lantana'
  },
  {
    _id: '57ca1c5cc104e3131eac5801',
    plural: 'Barba de Chivo',
    singular: 'Barba de Chivo'
  },
  {
    _id: '57ca1c5cc104e3131eac580a',
    plural: 'Pavonia',
    singular: 'Pavonia'
  },
  {
    _id: '57ca1c5cc104e3131eac5806',
    plural: 'Malva Blanca',
    singular: 'Malva Blanca'
  }
]
