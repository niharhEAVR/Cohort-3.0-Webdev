 **Easy schema**
```javascript
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: String,
  password: String
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}
```
​
 **Hard schema**
```javascript
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  name: String,
  email: {type: String, unique: true},
  password: String
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}
```

Setting `email` as unique (`{ type: String, unique: true }`) in a schema has several benefits, particularly when it comes to user authentication and data consistency:

### 1. **Prevents Duplicate User Registrations**
   - When `email` is unique, MongoDB automatically enforces this constraint, so no two users can register with the same email address. This prevents confusion and accidental duplication of accounts associated with the same email.

### 2. **Simplifies User Authentication**
   - Email addresses are often used as the primary identifier for users because they are unique to each person. Enforcing a unique email allows you to use email-based authentication, making it easy to verify identity when users log in or reset their passwords.

### 3. **Improves Data Integrity**
   - A unique email constraint ensures data consistency by preventing duplicate records in the database. This helps avoid scenarios where multiple accounts with the same email lead to ambiguous records or duplicate entries.

### 4. **Faster and More Reliable Lookups**
   - Since unique fields like `email` can be indexed automatically by MongoDB, searching by email becomes faster. The database only needs to look up one unique record instead of scanning through all entries, improving query performance for login or user lookup.

### 5. **Enables Secure Operations and Reduces Errors**
   - Without the unique constraint, developers would need to add custom validation logic to ensure no duplicate emails are stored. The unique constraint offloads this responsibility to the database, reducing potential errors and improving security.

### Example Use Case
In an app, if a user tries to sign up with an already-registered email, the unique constraint automatically triggers an error, and you can respond with a message like "Email already in use." This saves time, increases security, and maintains a clean database structure.