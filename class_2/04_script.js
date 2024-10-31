// Write an if/else statement that checks if a number is even or odd. If it's even, print "The number is even." Otherwise, print "The number is odd."
let a = "22"

if(a%2 === 0){
    console.log("The number is even")
}else{
    console.log("The number is odd")
}


// i was passing a string but still its calculates how?

// answer> In JavaScript, when you use the modulus operator (`%`) on a string, the engine implicitly converts the string to a number for the operation. In your example, when you do `a % 2`, JavaScript converts the string `"22"` to the number `22`, allowing the calculation to proceed.
// So, the code correctly determines that `22` is even and outputs "The number is even." This type of type coercion is a common feature in JavaScript, but it's important to be mindful of it to avoid unexpected results in other contexts.
// While JavaScript's type coercion can be convenient, it can also lead to unexpected results in more complex scenarios. For better practice, you may want to explicitly convert the string to a number using 'Number()' or 'parseInt()' before performing mathematical operations, like this: