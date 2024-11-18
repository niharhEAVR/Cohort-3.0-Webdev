{
    interface User {
        name: String,
        age: Number,
        address?: { // ? this means that user can give address or cannot 
            email: String,
            phno?: Number
        }
    }

    let user1: User = {
        name: "Cool dude",
        age: 45,
        address: {
            email: "cool@dude.com",
            phno: 87426
        }
    }

    let user2: User = {
        name: "alice",
        age: 24
    }

    let user3: User = {
        name: "bob",
        age: 13,
        address: {
            email:"bobba@bob.com"
        }
    }
}


{
    // interface can take another interface


    interface address {
        email:String,
        phno: Number
    }
    interface User2 {
        name: String,
        age: Number,
        address: address
    }
}