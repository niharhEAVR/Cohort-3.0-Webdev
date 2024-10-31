// Create a function that takes an array of objects as input,
// and returns the users whose age > 18 and are male


{
    // Normal Method

    // const users = [
    //     {
    //         name: "nihar",
    //         age: 19,
    //         gender: "male"
    //     },
    //     {
    //         name: "samir",
    //         age: 15,
    //         gender: "male"
    //     },
    //     {
    //         name: "arashi",
    //         age: 20,
    //         gender: "female"
    //     },
    //     {
    //         name: "harman",
    //         age: 20,
    //         gender: "male"
    //     }
    // ]

    // function check(user) {
    //     let arr = [];
    //     for(let i=0; i<users.length; i++){
    //         if(users[i].age > 18 && users[i].gender ==="male"){
    //             arr.push(users[i]);
    //         }
    //     }
    //     return arr
    // }

    // let result = check(users);
    // console.log(result);
}

{
    // little Advanced and Pro method

    const users = [
        {
            name: "nihar",
            age: 19,
            gender: "male"
        },
        {
            name: "samir",
            age: 15,
            gender: "male"
        },
        {
            name: "arashi",
            age: 20,
            gender: "female"
        },
        {
            name: "harman",
            age: 20,
            gender: "male"
        }
    ]
    //We can do this also it is little advanced
    // function check(user) {
    //     return user.age > 18 && user.gender ==="male"
    // }
    // let filteredUsers = users.filter(check)

    //This is pro level for now
    let filteredUsers = users.filter(user => user.age > 18 && user.gender === "male")

    console.log(filteredUsers)

}

{
    // use map and reduce methods and rewrite this code again
    let users = [
        {
            name: "William",
            age: 26,
            gender: "male"
        },
        {
            name: "Cooldude",
            age: 19,
            gender: "male"
        },
        {
            name: "Bowen",
            age: 13,
            gender: "female"
        }
    ]

    function adultUsers(users) {
        return users
            .map(user => user.age)
            .reduce((acc, age, index) => {
                if (age > 18) {
                    acc.push(users[index]);
                }
                return acc;
            }, []);
    }
    let adults = adultUsers(users)
    console.log(adults)
    // code explanation on the 10_notes.md
}