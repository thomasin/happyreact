var test = require('ava')
var httpMocks = require('node-mocks-http')

var configureDatabase = require('./helpers/database-config')
configureDatabase(test)

const m = require('../../server/middleware')

test.cb('checkLoggedIn returns next if user logged in', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    user: {
      name: 'test'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.pass()
    t.end()
  }
  m.checkLoggedIn(request, response, next)
})

test.cb('checkLoggedIn redirects if user not logged in', t => {
  let request = httpMocks.createRequest({
    method: 'GET'
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.fail()
    t.end()
  }
  m.checkLoggedIn(request, response, next)
  t.is(response.statusCode, 302)
  t.end()
})

test.cb('checkNotLoggedIn returns next if user not logged in', t => {
  let request = httpMocks.createRequest({
    method: 'GET'
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.pass()
    t.end()
  }
  m.checkNotLoggedIn(request, response, next)
})

test.cb('checkNotLoggedIn redirects if user logged in', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    user: {
      name: 'test'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.fail()
    t.end()
  }
  m.checkNotLoggedIn(request, response, next)
  t.is(response.statusCode, 302)
  t.end()
})

test.cb('checkVariablesValid returns next if variables valid', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    body: {
      variables: [{
        id: 2,
        value: 'y'
      }]
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.pass()
    t.end()
  }
  m.checkVariablesValid(request, response, next)
})

test.cb('checkVariablesValid returns 400 if variables not valid', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    body: {
      variables: [{
        id: 2,
        value: 'notvalid'
      }]
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.fail()
    t.end()
  }
  m.checkVariablesValid(request, response, next)
  t.is(response.statusCode, 400)
  t.end()
})

test.cb('checkNewVariableValid returns 400 if variables not valid', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    body: {
      variableName: 'notvalidbecauseiamabittoolong'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.fail()
    t.end()
  }
  m.checkNewVariableValid(request, response, next)
  t.is(response.statusCode, 400)
  t.end()
})

test.cb('checkNewVariableValid returns next if variable valid', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    body: {
      variableName: 'test'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.pass()
    t.end()
  }
  m.checkNewVariableValid(request, response, next)
})

test.cb('checkTableWhitelist returns next if table allowed', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    query: {
      tableName: 'entry'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.pass()
    t.end()
  }
  m.checkTableWhitelist(request, response, next)
})

test.cb('checkTableWhitelist returns 400 if table not allowed', t => {
  let request = httpMocks.createRequest({
    method: 'GET',
    query: {
      tableName: 'imnotallowed'
    }
  })
  let response = httpMocks.createResponse()
  let next = () => {
    t.fail()
    t.end()
  }
  m.checkTableWhitelist(request, response, next)
  t.is(response.statusCode, 400)
  t.end()
})
