const errorHandler = require('../../src/user/errorHandler')
const expect = require('chai').expect

describe('error handler module', function() {
  it('sends the results if the promise is resolved', function(done) {

    const handler = errorHandler.decorate(function(req, res) {
      return Promise.resolve({ok: true})
    })

    const req = {}

    const res = {
      send: function(value) {
        expect(value).to.deep.equal({ok: true})
        done()
      }
    }

    handler(req, res)
  })

  it('intercepts the errors when promises are rejected', function(done) {

    const handler = errorHandler.decorate(function(req, res) {
      return Promise.reject({type: 'user-not-found'})
    })

    var status = 0;

    const req = {}

    const res = {
      status: function(value) {
        status = value
        return res
      },
      send: function(value) {
        expect(status).to.equal(404)
        expect(value).to.deep.equal({type: 'user-not-found'})
        done()
      }
    }

    handler(req, res)
  })

})
