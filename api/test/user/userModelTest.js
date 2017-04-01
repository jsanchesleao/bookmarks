const userModel = require('../../src/user/userModel')
const expect = require('chai').expect


describe('user module', function() {
  it('searches users by their name', function(done) {
    const db = {
      collection: function(collName) {
        expect(collName).to.equal('user')
        return Promise.resolve({
          findOne: function(query) {
            expect(query).to.deep.equal({username: 'foo'})
            return {_id: 123, username: 'foo', password: 'ahash', bookmarks: []}
          }
        })
      }
    }

    userModel.getUserByName(db, 'foo').then(function(user) {
      expect(user).to.deep.equal({_id: 123, username: 'foo', password: 'ahash', bookmarks: []})
      done()
    })
  })

})
