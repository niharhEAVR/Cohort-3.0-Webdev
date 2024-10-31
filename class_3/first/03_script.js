// Remember one thing about the async function that which function executes first , that function will print first (First executes First print)
const file = require("fs");

function read(err, data) {
    console.log('\n\n1st')
    console.log("\n\nThe error is:")
    console.log(err)
    console.log(`The data we got from a.txt after reading is: ${data}`)
  }
  file.readFile("a.txt","utf-8",read)
  
  // the (readFile) is a async function 
  
  
  
  
  file.readFile("b.txt", "utf-8", function (err, contents) {
  console.log('\n\n2nd')
  console.log(`\n\nThe data we got from b.txt after reading is: ${contents}`);
});
// is this time we didnt write any separate function instead we attach the function inside the readFile async function 



file.readFile("01_script.js", "utf-8", function (err, contents) {
  console.log('\n\n3rd')
  console.log(`\n\nThe data from 01_script.js is: ${contents}`);
});


file.readFile("nihar.txt", "utf-8", function (err, contents) {
  console.log('\n\n4th')
  console.log("The Error is:")
  console.log(err);
  console.log("The Data is:")
  console.log(contents);
});


// this is a asynchronous program so the output might get shuffled