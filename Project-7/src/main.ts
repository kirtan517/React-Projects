let stringARr = ["one","kirtan", "kanani"]

let guitars = ["kirtan", "life " , "not good", 123]

let mixedData = ["evil", 1234, true]

stringARr[0] = "john"
stringARr.push("hye")

guitars[0] = 123;
guitars.unshift("jim")

guitars = stringARr

let test = []

let bands : string[] = [];

bands.push("Kirtan")
// Tuple 
let myTuple : [string,number,boolean] = ["Kirtan",43,true]

let mixed = ["John", 1 ,false]

mixed = myTuple

myTuple[1] = 42

// objects 

let myObj : object 
myObj = []
console.log(typeof(myObj))


const exampleObject = {
    prop1 : "kirtan",
    prop2 : true,
}

exampleObject.prop1 = "John"


interface Guitarist {
    name ?: string, 
    active?: boolean,
    albums : (string | number)[]
}

let temp : Guitarist ={
    name : "kirtan",
    active : false,
    albums : [1239,"kirtan", 1232]
};


let temp1 : Guitarist ={
    name : "kirtan1212",
    active : true,
    albums : ["THis ","kirtan", 1232]
};

temp = temp1;

// temp1.years = 40; error 


const greetGuitarist = (guitarist : Guitarist) =>{
    if(guitarist.name)
    return `Heello ${guitarist.name.toUpperCase()}`
    return `Hello`
}

console.log(temp1)


// Enums 

enum Grade {
    U= 5,
    D,
    C,
    B,
    A,
}

console.log(Grade.U)




