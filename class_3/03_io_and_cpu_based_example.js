function timeout() {
    console.log("i will print at last")
}

console.log("Hi")

setTimeout(timeout, 10000)

console.log("Welcome to Llama")

let c = 0;
for (let index = 1; index < 3; index++) {
    c = c + index
} 
console.log(c)

console.log("Expensive operation done")






// you wont understand properly what is happening here
// so run the code in here => http://latentflip.com/loupe/
// when you run the code there you get to see that the loop and timeout is running parrellaly, because setTimeout is a async function in js


function countdown(n) {
    if (n <= 0) return;
    console.log(n);
    countdown(n - 1);
  }
  countdown(3);
  