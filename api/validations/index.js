var mailExist = require('../auth/local/mailExist')

module.exports = function (app) {
  app.get('/validate', function (req, res) {
    var results = []
    var ids = []
    var rules = []
    if (Object.keys(req.query).length === 0) res.end()
    Object.keys(req.query).forEach(function (id) {
      var input = JSON.parse(req.query[id])
      switch (input.rule) {
        case 'ajaxMailExist':
          results.push(mailExist(true)(input.value))
          break
        case 'ajaxMailDontExist':
          results.push(mailExist(false)(input.value))
          break
        default:
          results.push(Promise.resolve(false))
      }
      ids.push(id)
      rules.push(input.rule)
    })
    Promise.all(results)
      .then(function (resultsVal) {
        var response = {}
        resultsVal.forEach(function (resu, i) {
          response[ids[i]] = {rule: rules[i], valid: resu}
        })
        res.json(response)
      })
  })
}
