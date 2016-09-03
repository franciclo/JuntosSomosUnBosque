module.exports = function (req, res) {
  try {
    var arboles = req.body.arboles
      .map(function (arbolStr) {
        return JSON.parse(arbolStr)
      })
  } catch (err) {
    res.json({
      success: false,
      text: 'Hubo un error',
      err: err
    })
  }
  req.user.arboles = arboles
  req.user.save(function (err) {
    if (err) {
      res.json({
        success: false,
        text: 'Hubo un error.'
      })
    }
    res.json({
      success: true,
      text: 'Arbols guardados',
      result: arboles
    })
  })
}
