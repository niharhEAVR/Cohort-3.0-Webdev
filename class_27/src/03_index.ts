{
    function greet(user: {
        name: String,
        age: number
    }) {
        console.log(`hello ${user.name}`)
    }

    greet({
        name: "nihar",
        age: 19
    })


    {
        let user: {
            name: String,
            age: number,
            address: {
                email: String,
                phno: number,
            }
        } = {
            name: "coolcude",
            age: 21,
            address: {
                email: "cooldude@coolmail.com",
                phno: 6385836
            }
        } // here we have to implicitely saying this is an object which have string and number and another object containing string and number
    }

    // this is reapeatative and computer-science main logic is don't repeat anything, thats why we need interface
}

{
    interface userType{
        name: String,
        age: number    
    }

    function greet(user:userType) {
        console.log(`hello ${user.name}`)
    }
    greet({
        name: "alice",
        age: 56
    })

    // interface is better to write a object which have all types
}