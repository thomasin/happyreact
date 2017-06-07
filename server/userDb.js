var bcrypt = require('bcrypt')


module.exports = {
  findById,
  findByEmail,
  createUser,
  comparePasswords
}

function findById (connection, id) {
  return connection('user')
    .where('user.id', id)
    .first()
}

function findByEmail (connection, email) {
  return connection('user')
    .where('user.email', email)
    .first()
}

function createUser (connection, email, password) {
  return bcrypt.hash(password, 10)
    .then((hash) => {
      return connection('user')
        .insert({
          email: email,
          hashedPassword: hash
        })
    })
    .catch((err) => err)
}

function comparePasswords (hashedPassword, password) {
    return bcrypt.compare(password, hashedPassword)
      .then((res) => res)
}
