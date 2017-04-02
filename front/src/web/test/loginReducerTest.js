import * as login from '../reducers/loginReducer'
import chai from 'chai'

const expect = chai.expect

describe('login reducer', function() {
  it('changes the value of the username, removing the error message', function() {
    const state  = {username: 'foo', password: '', failure: true}
    const action = {type: 'change-login-form-username', value: 'bar'}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({username: 'bar', password: '', failure: false})
  })

  it('changes the value of the password, removing the error message', function() {
    const state  = {username: 'foo', password: 'bar', failure: true}
    const action = {type: 'change-login-form-password', value: 'lalala'}
    const next  = login.reducer(state, action)

    expect(next).to.deep.equal({username: 'foo', password: 'lalala', failure: false})
  })
})
