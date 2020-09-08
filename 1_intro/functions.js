function myFirstFunction() {
    return "Hello World";
}

//anonym function - intet navn
//arrow function 
const myVariableFunction = () => {
    return "Hej fra Anonymfunction.";
}

//console.log(typeof myVariableFunction);

const myArrowFunction = () => {
    //console.log("hi there");
}

//callback
function sayHiLater(aFunction) {
    aFunction();
}

sayHiLater(myArrowFunction);

const poke = (name) => "poke " + name;
const hug = (name) => "hug " + name;

function interact(aFunction, name) {
    return aFunction(name);
}

console.log(interact(poke, "Anders"));
console.log(interact(hug, "Andreas"));