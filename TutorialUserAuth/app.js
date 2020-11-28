const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
//video: www.youtube.com/watch?v=Ud5xKCYQTjM
app.use(express.json())

//listen er kun for testing / bør slettes i prod 
const users = []

//Denne er kun for testing. Bør slettes i prod.
app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
   
})

//dokumentation: https://github.com/kelektiv/node.bcrypt.js#to-check-a-password
app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null){
        return res.status(400).send('cannot find user')
    }
    try {
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success')
        } else {
            res.send('Failure')
        }
    } catch {
        res.status(500).send()
    }
})


app.listen(8080, (err) => {
    if( err ) {throw err}
    console.log("Server is running on 8080")
})