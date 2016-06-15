var mailExist = require('../auth/local/mailExist')

module.exports = function(app) {
    app.get('/validate',function(req, res){
      var results = []
      var names = []
      if (Object.keys(req.query).length === 0) res.end()
      Object.keys(req.query).forEach(function(name){
        var input = JSON.parse(req.query[name])
        switch(input.rule){
          case 'ajaxMailExist':
            results.push(mailExist(true)(input.value))
            break
          case 'ajaxMailDontExist':
            results.push(mailExist(false)(value))
            break
          default:
            results.push(Promise.resolve(false))
        }
        names.push(name)
      })
      Promise.all(results)
        .then(function(resultsVal){
          var response = {}
          resultsVal.forEach(function(resu, i){
            response[names[i]] = resu
          })
          res.json(response)
        })
    })
  }