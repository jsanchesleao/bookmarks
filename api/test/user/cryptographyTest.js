const cryptography = require('../../src/user/cryptography')
const expect = require('chai').expect

describe('cryptography module', function() {
  it('encrypts and compares passwords correctly', function(done) {
    const passwd = 'foo'

    cryptography.encryptPassword('foo').then(function(hashed) {
      return cryptography.comparePassword('foo', hashed)
    }).then(function(result) {
      expect(result).to.equal(true)
      done()
    })
  })

  it('encrypts and compares passwords correctly, failing when they dont match', function(done) {
    const passwd = 'foo'

    cryptography.encryptPassword('foo').then(function(hashed) {
      return cryptography.comparePassword('bar', hashed)
    }).catch(function(error) {
      expect(error.type).to.equal('password-dont-match')
      done()
    })
  })
})
