// Write a function that takes an array of users as inputs and returns only the users who are more than 18 years old
let users = [
    {
        name : "Nihar",
        age:19
    },
    {
        name: "Aksath",
        age:15
    },
    {
        name: "Raman",
        age: 20
    }
]

function checkAge(user) {

    for(let i = 0; i < user.length; i++){
        if((user[i].age) > 18){
            console.log(user[i])
        }
    }
}

checkAge(users)