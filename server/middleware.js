const validation = require('../utils/validation')

function checkLoggedIn (req, res, next) {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

function checkNotLoggedIn (req, res, next) {
  if (!req.user) {
    return next()
  }
  res.redirect('/dashboard/')
}

function checkVariablesValid (req, res, next) {
  let valid = true
  req.body.variables.forEach((variable) => {
    let variableObject = validation.validateVariableValue(variable)
    valid = variableObject.valid
  })
  if (valid) return next()
  res.sendStatus(400)
}

function checkNewVariableValid (req, res, next) {
  if (validation.validateVariableValue({ value: req.body.variableName, id: 'newVariable' }).valid) return next()
  res.sendStatus(400)
}

function checkTableWhitelist (req, res, next) {
  let whiteList = ['variable', 'entry']
  if (whiteList.includes(req.query.tableName)) return next()
  res.sendStatus(400)
}

module.exports = {
  checkLoggedIn,
  checkVariablesValid,
  checkNewVariableValid,
  checkTableWhitelist,
  checkNotLoggedIn
}
