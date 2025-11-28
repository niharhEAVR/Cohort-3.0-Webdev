interface User {
	firstName: string;
	lastName: string;
	age: number;
}

function filteredUsers(users: User[]) { // Make it a function that takes an array of User objects
    return users.filter(x => x.age >= 18);
}

console.log(filteredUsers([{
    firstName: "no",
    lastName: "name",
    age: 21
}, {
    firstName: "bo",
    lastName: "name",
    age: 16
}, ]));