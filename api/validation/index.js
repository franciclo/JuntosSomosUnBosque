var mailExist = require('../auth/local/mailExist')

module.exports = function(app) {
    app.get('/validate',function(req, res){
      var results = []
      var ids = []
      if (Object.keys(req.query).length === 0) res.json({success:false})
      Object.keys(req.query).forEach(function(id){
        var rule = id.split('_')[0]
        var value = req.query[id]
        switch(rule){
          case 'ajaxMailExist':
            results.push(mailExist(true)(value))
            ids.push(id)
            break
          case 'ajaxMailDontExist':
            results.push(mailExist(false)(value))
            ids.push(id)
            break
          default:
            results.push(Promise.resolve(false))
            ids.push('default')
        }
      })
      Promise.all(results)
        .then(function(resultsVal){
          var response = {}
          resultsVal.forEach(function(resu, i){
            response[ids[i]] = resu
          })
          res.json(response)
        })
    })
  }