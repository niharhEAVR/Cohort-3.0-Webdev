{
    // without record
    type Users = {
        [key: string]: User;
    }
    type User = {
        id: String;
        username: String;
    }


    const database: Users = {
        "user-id-1": {
            id: "uegfug24@r",
            username: "cooldude"
        },
        "user-id-2": {
            id: "uegf535#r",
            username: "alex"
        }
    }
}

{
    // with record
    type Users = Record<string, {id: String, username: String}>

    const database: Users = {
        "user-id-1": {
            id: "uegfug24@r",
            username: "cooldude"
        },
        "user-id-2": {
            id: "uegf535#r",
            username: "alex"
        }
    }
}


{
    // map is not related to the up code 
    interface User {
        id: string;
        name: string;
    }
    
    // Initialize an empty Map
    const usersMap = new Map<string, User>();
    
    // Add users to the map using .set
    usersMap.set('abc123', { id: 'abc123', name: 'John Doe' });
    usersMap.set('xyz789', { id: 'xyz789', name: 'Jane Doe' });
    
    // Accessing a value using .get
    console.log(usersMap.get('abc123')); 
    // Output: { id: 'abc123', name: 'John Doe' }
}