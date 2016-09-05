var especies = require('./especies-data')

module.exports = function (req, res) {
  return res.json(
    {
      success: true,
      result: especies
    })
}
