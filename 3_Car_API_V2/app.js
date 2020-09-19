const { query } = require('express')
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

//bruges til post body
app.use(express.json())

//brgues til ?
app.use(express.urlencoded({extended: true}))


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

app.post("/cars", (req, res) => {
    const newCar = { name: req.body.name, color: req.body.color }    
    con.query(`INSERT INTO cars SET ?`, newCar, (error, res) => {
        if(error) { throw error }
        console.log(`Car was added! Id: ${res.insertId}`)
        
    }) 
})

app.put("/cars/:id", (req, res) => {
    const updatedCar = [ req.body.name, req.body.color, req.params.id ]
    con.query(`UPDATE cars SET name = ?, color = ? WHERE id = ?`, updatedCar, (error, result) => {
        if(error) { throw error }
        console.log(`Changed ${result.changedRows} rows(s)`)
        res.send({})
    })
})

app.delete("/cars/:id", (req,res) => {
    con.query(`DELETE FROM cars WHERE id = ?`, [req.params.id], (error, result) => {
        if(error) { throw error }
        console.log(`Deleted ${result.affectedRows} rows(s)`)
        res.send({})
    })
})

app.listen(port, (error) => {
    if(error) console.log(`Something went wrong`)
    else console.log(`api server is running on localhost:${port}`)
}) 