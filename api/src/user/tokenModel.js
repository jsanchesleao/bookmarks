const randomstring = require('randomstring')

const TOKEN_COLLECTION = 'token'

function saveToken(db, user) {
  const token = randomstring.generate(64)
  return db.collection(TOKEN_COLLECTION)
    .then(coll => coll.insertOne({
      username: user.username,
      type: user.type || 'client',
      token: token
    }))
    .then(() => ({token: token}))
}

function validateTokenRole(db, token, role) {
  return db.collection(TOKEN_COLLECTION)
    .then(coll => coll.findOne({token: token}))
    .then(doc => {
      if (!doc) {
        return Promise.reject({type: 'token-not-found'})
      }
      else if (doc.type === role) {
        return Promise.resolve({type: 'role-ok'})
      }
      else {
        return Promise.reject({type: 'role-not-ok'})
      }
    })
}

function validateTokenClient(db, token, username) {
  return db.collection(TOKEN_COLLECTION)
    .then(coll => coll.findOne({token: token}))
    .then(doc => {
      console.log('TOKEN DOC', doc)
      if (!doc) {
        return Promise.reject({type: 'token-not-found'})
      }
      else if (doc.type === 'admin' || doc.username === username) {
        return Promise.resolve({type: 'role-ok'})
      }
      else {
        return Promise.reject({type: 'role-not-ok'})
      }
    })
}

function validateTokenUsername(db, token, username) {
  return db.collection(TOKEN_COLLECTION)
    .then(coll => coll.findOne({token: token}))
    .then(doc => {
      console.log('TOKEN DOC', doc)
      if (!doc) {
        return Promise.reject({type: 'token-not-found'})
      }
      else if (doc.username === username) {
        return Promise.resolve({type: 'role-ok'})
      }
      else {
        return Promise.reject({type: 'role-not-ok'})
      }
    })
}

module.exports = {
  saveToken: saveToken,
  validateTokenRole: validateTokenRole,
  validateTokenClient: validateTokenClient,
  validateTokenUsername: validateTokenUsername
}
