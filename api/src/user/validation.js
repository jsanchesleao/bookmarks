const validator = require('enforcement').create()

const User = validator.Schema({
  username: 'required string',
  password: 'required string',
  type: 'string'
})

const LoginRequest = validator.Schema({
  username: 'required string',
  password: 'required string'
})

const SaveBookmarkRequest = validator.Schema({
  url: 'required string'
})

const UpdateBookmarkRequest = validator.Schema({
  url: 'required string'
})

const check = Schema => object => {
  try {
    Schema.check(object)
    return {success: true}
  }
  catch(e) {
    return {success: false, error: e}
  }
}

module.exports = {
  checkUser: check(User),
  checkLoginRequest: check(LoginRequest),
  checkSaveBookmarkRequest: check(SaveBookmarkRequest),
  checkUpdateBookmarkRequest: check(UpdateBookmarkRequest)
}
