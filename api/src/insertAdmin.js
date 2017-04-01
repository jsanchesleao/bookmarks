const db = require('./db')
const cryptography = require('./user/cryptography')

const name = process.argv[2]
const password = process.argv[3]

if (!name || !password) {
  console.log('usage: node insertAdmin <name> <password>')
  process.exit(1)
}


const userCollPromise = db.collection('user')
const hashedPasswordPromise = cryptography.encryptPassword(password)
const userPromise = userCollPromise.then(coll => coll.findOne({username: name}))

Promise.all([userCollPromise, hashedPasswordPromise, userPromise])
       .then(results => {
         const coll = results[0]
         const hashedPassword = results[1]
         const user = results[2]

         if (user) {
           console.log('This username has already been taken')
           process.exit(1)
         }
         else {
           return coll.insertOne({username: name, password: hashedPassword, type: 'admin'})
         }
       })
       .then(() => {
         console.log('Admin successfully registered')
         process.exit(0)
       })
       .catch(err => {
         console.log(err)
         process.exit(1)
       })
