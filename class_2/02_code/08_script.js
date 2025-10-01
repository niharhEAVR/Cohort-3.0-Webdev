// Write a function that takes an array of numbers as input, and returns a new array with only even values. Read about filter in JS
let numbers = [1,2,3,4,5,6,,8,9,10,4,45,37,44,23,12,56]

let evenVlues =  numbers.filter(checkEven)
console.log(evenVlues)

function checkEven(num) {
    return num % 2 == 0
}