"use strict";
let stringARr = ["one", "kirtan", "kanani"];
let guitars = ["kirtan", "life ", "not good", 123];
let mixedData = ["evil", 1234, true];
stringARr[0] = "john";
stringARr.push("hye");
guitars[0] = 123;
guitars.unshift("jim");
guitars = stringARr;
let test = [];
let bands = [];
bands.push("Kirtan");
// Tuple 
let myTuple = ["Kirtan", 43, true];
let mixed = ["John", 1, false];
mixed = myTuple;
myTuple[1] = 42;
// objects 
let myObj;
myObj = [];
console.log(typeof (myObj));
const exampleObject = {
    prop1: "kirtan",
    prop2: true,
};
exampleObject.prop1 = "John";
let temp = {
    name: "kirtan",
    active: false,
    albums: [1239, "kirtan", 1232]
};
let temp1 = {
    name: "kirtan1212",
    active: true,
    albums: ["THis ", "kirtan", 1232]
};
temp = temp1;
// temp1.years = 40; error 
const greetGuitarist = (guitarist) => {
    if (guitarist.name)
        return `Heello ${guitarist.name.toUpperCase()}`;
    return `Hello`;
};
console.log(temp1);
// Enums 
var Grade;
(function (Grade) {
    Grade[Grade["U"] = 5] = "U";
    Grade[Grade["D"] = 6] = "D";
    Grade[Grade["C"] = 7] = "C";
    Grade[Grade["B"] = 8] = "B";
    Grade[Grade["A"] = 9] = "A";
})(Grade || (Grade = {}));
console.log(Grade.U);
