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

function insertOne(coll, data) {
  return new Promise(function(resolve, reject) {
    coll.insertOne(data, function(err, result) {
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
  collection: collection
}
