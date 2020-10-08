const express = require("express")
const app = express()
const port = 8080

const mysql = require('mysql')
const conn = mysql.createConnection({
  host: 'localhost',
  port: '9901',
  user: 'root',
  password: 'hejhej321',
  database: 'unodb'
})

conn.connect((error) => {
    if(error){
        console.log(`Error connecting to db: ${error}`)
        return
    }
    console.log(`mysql connection established`)
});

app.use(express.json());
app.use(express.urlencoded({extended: true}))
//app.use(express.static("./public"));

app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/index.html")
});

app.get("/players", (req, res) => {
    conn.query('SELECT * From players'), (error, rows) => {
        if(error) throw error
        let cars = []
        //kan json parse bruges her?
        for(let i = 0; i < rows.length; i++){
            const datarow = { id: rows[i].id, name: rows[i].name, color: rows[i].color }
            cars.push(datarow)
        }
        res.send(cars)
    }
    
});
/*
app.post("/players", (req, res) => {
    const newPlayer = req.body.name
    console.log(req.body.name)
    conn.query = `INSERT INTO players (name) VALUES ('${newPlayer}')`, (err, res) => {
        if(err) { throw err }
        console.log(`Player was added: ${res.insertId}`)
    }

})
*/
app.listen(port, (error) => {
    if(error) throw error

    console.log("server is running on: ", port)
})