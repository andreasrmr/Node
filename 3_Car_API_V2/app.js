const express = require(`express`)
const app = express()
const port = 8080
const mysql = require('mysql')

const con = mysql.createConnection({
  host: 'localhost',
  port: '9901',
  user: 'root',
  password: 'hejhej321',
  database: 'my_db'
})

con.connect((error) => {
    if(error){
        console.log(`Error connecting to db: ${error}`)
        return
    }
    console.log(`mysql connection established`)
})


/* ???????
con.end((error) => {
    
})
*/

app.get("/", (req, res) => {
    res.send("Nothing to see here")
})

app.get("/cars", (req, res) => {
    con.query('SELECT * From cars', (error, rows) => {
        if (error) { throw error }
    
        let cars = []
        for(let i = 0; i < rows.length; i++){
            const datarow = { id: rows[i].id, name: rows[i].name, color: rows[i].color }
            cars.push(datarow)
        }
        res.send(cars)
    })   
})

//throws error if id is non existant ?
app.get("/cars/:id", (req, res) => {
    con.query(`SELECT * FROM CARS where id = ${req.params.id}; `, (error, rows) => {
        if(error) { throw error }
        const datarow = { id: rows[0].id, name: rows[0].name, color: rows[0].color }
        res.send(datarow)
    })
})

app.listen(port, (error) => {
    if(error) console.log(`Something went wrong`)
    else console.log(`api server is running on localhost:${port}`)
}) 