const express = require("express")
const app = express()
const port = 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("Nothing to see here")
})

let cars = [
    { id: "1", name: "Mazda" },
    { id: "2", name: "Mitsubishi"},
    { id: "7", name: "Honda"},
    { id: "8", name: "Audi"},
    { id: "9", name: "Citroen"}
]
console.log(cars)
let nextCarId = (Number(cars[cars.length-1].id) + 1)

function findIndex(id) {
    let index
    for(let i = 0; i < cars.length; i++){
        if(cars[i].id == id){
            index = i
            break
        }
    }
    return index
}

app.get("/cars", (req, res) => {
    res.send(cars)
})

app.get("/cars/:id", (req, res) => {
    const carId = req.params.id
    const index = findIndex(carId)
    let car = cars[index]
    res.send({car})
})

app.post("/cars", (req, res) => {
    const carId = nextCarId.toString()
    nextCarId++
    const newCar = { id: carId, name: req.body.name }
    cars.push(newCar)
    res.send({newCar})
})

app.put("/cars/:id", (req, res) => {
    const carId = req.params.id
    const index = findIndex(carId)
    const updatedCar = { id: carId, name: req.body.name}
    if(index != undefined){
        cars[index] = updatedCar   
    }
    else {
        cars.push(updatedCar)
    }
    res.send({updatedCar})
})

app.delete("/cars/:id", (req, res) => {
    const carId = req.params.id
    const index = findIndex(carId)
    const deletedCar = cars.splice(index, 1)
    res.send({deletedCar})
})

app.listen(port, (error) => {
    if(error){
        console.log("Something went wrong")
    }
    console.log(`Server is running on port: ${port}`)
})


