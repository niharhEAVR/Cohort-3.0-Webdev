// Promisified version of readFile function 

const fs = require("fs");

console.log("----------top of the code----------\n")

function readTheFile(resolve) {
    console.log("async file reading started\n")
    fs.readFile("01_text.txt", "utf-8", function (err, data) {
        console.log("just because the readFile a asynchronous function thats why data read took time\n")
        resolve(data); // here promise get resolved and the resolve is returning the data to (.then)
    })
}

function readFile(fileName) {
    console.log("new promise called or created\n")
    return new Promise(readTheFile); // it is not necessary to give (resolve, and reject) parameters evertime, instead we can pass a callback function which will choose either its resolved or rejected
}

const p = readFile();

function printData(contents) {
    console.log(`Inside the file is:\n${contents}`);

}

p.then(printData) // here .then get the data and its passing the data to printData function
console.log("----------end of the code----------\n")