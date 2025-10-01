const path = require("path")

console.log(__dirname)  // this __dirname is actually show me which directory currently i am in, same as what pwd do in terminal


console.log(__dirname, "../../index.js")
console.log(path.join(__dirname, "../../../index.js")) // this line works as cd command in terminal
// now if you run the code on terminal you will clearly see the difference