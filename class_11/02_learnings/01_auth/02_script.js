const users = [
    {
        "userName" : "foolldude",
        "password" : "cooldude"
    },
    {
        "userName" : "doolldude",
        "password" : "cooldude"
    }
];

const findUser = users.find(user => user.userName === "foolldude" && user.password === "cooldude");

console.log(findUser)