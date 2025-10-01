// Write a function called canVote that returns true or false if the age of a user is > 18
let age = 18

function canVote(age) {
    if (age >= 18) {
        return true
    } else {
        return false
    }
}

if (canVote(age)) {
    console.log("You are eligible to vote")
} else {
    console.log("You are not eligible to vote")
}