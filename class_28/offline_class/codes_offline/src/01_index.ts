{
    // Pick (works for both type & interface)
    type User = {
        name: String;
        age: number;
        address: String;
    }
    const user1: Pick<User, "name" | "age"> = {
        name: "cooldude",
        age: 45
    }

    console.log(user1.name, user1.age);
    // console.log(user1.address); // This wont possible because the user1 dont have the full access.


    interface People {
        name: String;
        age: number;
        address: String;
    }
    const poeple1: Pick<People, "name" | "address"> = {
        name: "noname",
        address: "noname@noname.com",
    }
    console.log(poeple1.name, poeple1.address);
    // console.log(poeple1.age);
}

{
    // Partial
    type User = {
        id: number;
        name: string;
        email: string;
    };
    const u: User = {
        id: 1,
        name: "Raj",
        email: "raj@mail.com"
    };
    const u2: Partial<User> = {
        name: "Raj"
    };

    console.log(u.email); // (property) email: string
    console.log(u2.email); // (property) email?: string | undefined
    
}


{
    // Readonly
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

// all three utility types (Pick, Partial, Readonly) work with BOTH:
// ✔ Type aliases (type)
// ✔ Interfaces (interface)