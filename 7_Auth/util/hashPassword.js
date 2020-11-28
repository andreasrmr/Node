//create a script that hashes passwords
// get the pasword the hash from args

console.log(process.argv[2])

const bcrypt = require('bcrypt')
const saltRounds = 12;
const myPlainTextPassword = process.argv[2]

bcrypt.hash(myPlainTextPassword, saltRounds, function(err, hash) {
    if(err) { throw err };
    console.log(hash)
})
