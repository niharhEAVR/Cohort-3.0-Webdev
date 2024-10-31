const file = require("fs");
// the (const file) is an object
// and the fs is a node.js library

const contents = file.readFileSync("a.txt", "utf-8");
console.log(contents);

// run it using node command in terminal