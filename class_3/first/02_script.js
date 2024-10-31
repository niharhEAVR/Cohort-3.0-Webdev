const file = require("fs");

const contents = file.readFileSync("b.txt", "utf-8");
console.log(contents);
const contents2 = file.readFileSync("b.txt");
// if we dont use utf-8 encoding the output will in in array of bytes of the original texts
console.log(contents2);
