{
    // Read Only
    {
        type User = {
            name: String;
            age: number
        }
        const user1: Readonly<User> = {
            name: "cooldude",
            age: 45
        }
        // user1.age = 54 // we cant do this
    }
    {
        type User = {
            readonly name: String;
            readonly age: number;
            random: number;
        }
        const user1: User = {
            name: "cooldude",
            age: 45,
            random: 56,
        }
        // user1.age = 54 //we cant do this
        user1.random = 54 // but we can change this
    }
}