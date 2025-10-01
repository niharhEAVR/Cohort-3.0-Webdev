// Write a function that takes a new object as input which has name , age  and gender and greets the user with their gender (Hi Mr/Mrs/Others harkirat, your age is 21)

// Also tell the user if they are legal to vote or not
let user = {
    name: "Nihar Debnath",
    age: 19,
    gender: 'Male'
}

let saluatation;
function greet(user) {
    switch (user.gender) {
        case 'Female':
            saluatation = "Mrs."
            break;
        case 'Male':
            saluatation ="Mr."
            break;
    
        default:
            saluatation = "Others"
            break;
    }
    console.log(`Hi ${saluatation} ${user.name}, your age is ${user.age}`)

    if(user.age>=18){
        console.log("You can vote")
    }else{
        console.log("You cannot vote")
    }
}
greet(user)