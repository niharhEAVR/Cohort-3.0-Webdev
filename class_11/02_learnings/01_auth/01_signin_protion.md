### Signin Route (`/signin`)
```javascript
app.post("/signin", (req, res) => {
    const { userName, password } = req.body;

    const findUser = users.find(user => user.User_Name === userName && user.Password === password);

    if (findUser) {
        const userToken = generateToken();
        findUser.Token = userToken;

        res.json({
            Token: userToken
        });
        console.log(users)
    } else {
        return res.status(403).send({
            message: "Invalid username or password"
        });
    }
});
```

In this section, the token is being stored directly within the `findUser` object, which is a reference to a specific user object in the `users` array. Let’s break it down more clearly:

1. **Finding the User**:
   ```javascript
   const findUser = users.find(user => user.User_Name === userName && user.Password === password);
   ```
   - Here, `findUser` is assigned a reference to the user object in the `users` array that matches the `userName` and `password` provided in the request.
   - If no match is found, `findUser` will be `undefined`.

2. **Adding the Token**:
   ```javascript
   if (findUser) {
       const userToken = generateToken();
       findUser.Token = userToken;
   ```
   - Since `findUser` is a reference to an object in the `users` array, adding `findUser.Token = userToken;` directly modifies that object within the `users` array.
   - This means `Token` is stored within the user object in `users`, alongside `User_Name` and `Password`.

3. **Result**:
   - Now, each time a user signs in successfully, their object in `users` will contain a `Token` field with a unique token value.
   - Here’s an example of what the `users` array might look like after two users sign up and one of them signs in:
     ```javascript
     [
       { User_Name: "Alice", Password: "alice123", Token: "a_generated_token_for_alice" },
       { User_Name: "Bob", Password: "bob123" } // Bob hasn't signed in yet, so no token
     ]
     ```
   - Since `findUser` is a reference to the original object in `users`, any changes made to `findUser` (like adding `Token`) are immediately reflected in `users`. This is why the token appears to be “stored” in `users` automatically.

--- 

### Q.> How `findUser` is assigned a reference to the user object in the `users` array.

This is happening because in JavaScript, objects and arrays are **reference types**. When you use a method like `find` on an array of objects, it doesn’t create a new copy of the object—it just returns a reference to the original object in the array. Let’s go through this in detail:

### Understanding Reference Types
When we declare an object or array in JavaScript, it’s stored in memory, and any variable assigned to it actually holds a **reference** to that location in memory, not a direct copy of the data. This means that if you assign an object to another variable, you’re not duplicating the object; you’re just creating another reference to the same memory location.

### Step-by-Step Example in the Code

1. **The Array of Users (`users`):**
   ```javascript
   const users = [];
   ```
   - Here, `users` is an array that will hold user objects. Each object inside this array will have its own memory location.

2. **Using `find` to Get a Reference to an Object:**
   ```javascript
   const findUser = users.find(user => user.User_Name === userName && user.Password === password);
   ```
   - `users.find(...)` searches for the first user object that matches the given `userName` and `password`.
   - When it finds a match, it doesn’t create a new copy of the user object. Instead, it returns a reference to that exact user object stored in the `users` array.
   - This means `findUser` and the corresponding object in `users` are now two references pointing to the same object in memory.

3. **Modifying the Object through the Reference:**
   ```javascript
   if (findUser) {
       const userToken = generateToken();
       findUser.Token = userToken;
   }
   ```
   - By assigning `findUser.Token = userToken;`, you’re adding a `Token` field directly to the original user object in `users` because `findUser` is pointing to the same object in memory.
   - Any change to `findUser` is automatically reflected in `users` because they both refer to the same object.

### Visualizing the Reference

Imagine `users` as a drawer with index labels, where each label points to an object in memory:

```javascript
users = [
   { User_Name: "Alice", Password: "alice123" }, // Let's say this object is at memory location 0x001
   { User_Name: "Bob", Password: "bob123" }      // And this object is at memory location 0x002
];
```

When `findUser` finds "Alice," it points to the object at `0x001`. When you modify `findUser.Token`, you’re modifying the object at `0x001`. Thus, `users[0]` also reflects this change, as both point to the same place in memory.

### Key Takeaway
In JavaScript, when working with objects and arrays, assigning or accessing items by reference means you’re working with the same data in memory, not copies. This is why changes to `findUser` directly affect `users`.