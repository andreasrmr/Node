// --------------------------------------
// Variables, strings, numbers, floats
// --------------------------------------
// Exercise 1 - Console and constiables

const firstName = "Anders";
const lastName = "Latif";
// EXERCISE
// show in the console
// My first name is Anders and my last name is Latif

console.log("My first name is %s and my last name is %s", firstName, lastName);
console.log("My first name is", firstName, "and my last name is", lastName);

//Brug denne
console.log(`My first name is ${firstName} and my last name is ${lastName}`);

//oprettelse af string typer
const stringTypeOne = "This is 'weird'";
const stringTypeTwo = 'This is "weird"';
const stringTypeThree = `"This is" '"`

// --------------------------------------
// Exercise 2 - Numbers and Strings

const year = "2019";
const number = 1;

// Add the year plus the number
// The result should be 2020
// You cannot touch line 1 or 2

let result = parseInt(year) + number;
console.log(result);

//andet halløj
const currentYear = Number(year) + number;
const testParsing = "12a3abc";
console.log(parseInt(testParsing))
console.log(Number(testParsing))



// --------------------------------------
