const tokenModel = require('../../src/user/tokenModel')
const expect = require('chai').expect


describe('token module', function() {
  it('saves a token correctly', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          insertOne: function(data) {
            expect(data.username).to.equal('foo')
            expect(data.type).to.equal('client')
            expect(data.token).to.be.a('string')
            done()
          }
        })
      }
    }

    tokenModel.saveToken(db, {username: 'foo', type: 'client'})
  })


  it('validates a token against a type', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          findOne: function(data) {
            return {username: 'foo', token: 'sometoken', type: 'admin'}
          }
        })
      }
    }

    tokenModel.validateTokenRole(db, 'sometoken', 'admin').then(result => {
      done()
    })
  })

  it('validates a token against a type, failing if types dont match', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          findOne: function(data) {
            return {username: 'foo', token: 'sometoken', type: 'client'}
          }
        })
      }
    }

    tokenModel.validateTokenRole(db, 'sometoken', 'admin').catch(err => {
      expect(err.type).to.equal('token-not-ok')
      done()
    })
  })

  it('validates a token against a username', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          findOne: function(data) {
            return {username: 'foo', token: 'sometoken', type: 'client'}
          }
        })
      }
    }

    tokenModel.validateTokenUsername(db, 'sometoken', 'foo').then(result => {
      done()
    })
  })

  it('validates a token against a username, failing if they dont match', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          findOne: function(data) {
            return {username: 'foo', token: 'sometoken', type: 'client'}
          }
        })
      }
    }

    tokenModel.validateTokenUsername(db, 'sometoken', 'bar').catch(err => {
      expect(err.type).to.equal('token-not-ok')
      done()
    })
  })

  it('validates a token against a username, allowing any admin to pass', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('token')
        return Promise.resolve({
          findOne: function(data) {
            return {username: 'foo', token: 'sometoken', type: 'admin'}
          }
        })
      }
    }

    tokenModel.validateTokenClient(db, 'sometoken', 'bar').then(() => {
      done()
    })
  })

})
