const bcrypt = require('bcrypt-nodejs')

function encryptPassword(password) {
  return new Promise(function(resolve, reject) {
    bcrypt.genSalt(10, function(error, salt) {
      if (error) {
        reject(error)
      }
      else {
        bcrypt.hash(password, salt, null, function(error, hash) {
          if (error) {
            reject(error)
          }
          else {
            resolve(hash)
          }
        })
      }
    })
  })
}

function comparePassword(password, hashedPassword) {
  return new Promise(function(resolve, reject) {
    bcrypt.compare(password, hashedPassword, function(error, result) {
      if (error) {
        reject(error)
      }
      else if (!result) {
        reject({type: 'password-dont-match'})
      }
      else {
        resolve(true)
      }
    })
  })
}

module.exports = {
  encryptPassword: encryptPassword,
  comparePassword: comparePassword
}
