function decorate(handler) {
  return function(req, res) {
    const resultPromise = handler(req, res)

    resultPromise.then(result => res.send(result))
                 .catch(err => {
      if (err.type === 'user-not-found') {
        res.status(404).send({type: 'user-not-found'})
      }
      else if (err.type === 'username-taken') {
        res.status(422).send({type: 'username-taken'})
      }
      else if (err.type === 'password-dont-match') {
        res.status(401).send({authenticated: false})
      }
      else if (err.type === 'bookmark-name-exists') {
        res.status(422).send(err)
      }
      else {
        res.status(500).send(err)
      }
    })
  }
}

module.exports = {
  decorate: decorate
}
