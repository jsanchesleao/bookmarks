const mongodb = require('mongodb')
const config  = require('../config.json')
const MongoClient = mongodb.MongoClient

const db = new Promise(function(resolve, reject) {
  MongoClient.connect(config.mongoUrl, function(err, db) {
    if (err) {
      reject(err)
    }
    else {
      resolve(db)
    }
  })
})

function collection(coll) {
  return db.then(db => db.collection(coll))
}

function find(coll, query, select) {
  return new Promise(function(resolve, reject) {
    coll.find(query, select).toArray(function(err, result) {
      if (err) {
        reject(err)
      }
      else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  collection: collection,
  find: find
}
