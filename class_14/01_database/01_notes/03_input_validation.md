# Input validation

In TypeScript, Zod is a library used for schema validation and parsing. It's designed to help developers define, validate, and manage data structures in a type-safe manner. 

learn zod from here

```link
https://zod.dev/
```

---


```javascript
app.post("/signup", async (req, res) => {
    const requiredInput = zod.object({
        email: zod.string().min(7).max(100).email(),
        password: zod.string().min(6).max(100),
        name: zod.string()
    });
    const parsedDataWithSuccess = requiredInput.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.status(403).json({
            message: "Invalid format of email or minimum password is 6 characters",
            errors: parsedDataWithSuccess.error.errors  
        });
    }

    const { email, password, name } = req.body;
    try {

        const hashedPassword = await bcrypt.hash(password, 5)
        await userModel.create({
            email: email,
            password: hashedPassword,
            name: name
        })
        res.json({
            messege: "Signed up succesfully."
        })
    } catch (error) {
        res.json({
            messege: "an user with a same email id already exists"
        })
    }
})
```


In this code, the **Zod** portion is used to validate the incoming `req.body` data in a safer, more efficient way. Let's go through it in detail.

### Zod Schema for Input Validation
```javascript
const requiredInput = zod.object({
    email: zod.string().min(7).max(100).email(),
    password: zod.string().min(6).max(100),
    name: zod.string()
}); 
```
- **Purpose**: This defines a Zod schema named `requiredInput` that specifies the expected structure of incoming data.
- **Fields**:
  - **email**: Must be a string with a length between 7 and 100 characters, and it should follow a valid email format.
  - **password**: Must be a string with a length between 6 and 100 characters.
  - **name**: Must be a string (without additional restrictions here).

### Validating Data Using `safeParse`
```javascript
const parsedDataWithSuccess = requiredInput.safeParse(req.body);
```
- **What It Does**: The `safeParse` method checks if `req.body` matches the `requiredInput` schema.
- **Return Object**:
  - If validation succeeds, `parsedDataWithSuccess.success` will be `true`, and `parsedDataWithSuccess.data` will hold the validated data.
  - If validation fails, `parsedDataWithSuccess.success` will be `false`, and `parsedDataWithSuccess.error.errors` will contain details about what went wrong (e.g., which fields failed validation).

### Why `safeParse` Over `parse`?
The code comments explain that the alternative method, `parse`, will throw an error if validation fails, requiring a try-catch to handle this potential error and prevent the backend from crashing. With `safeParse`, there's no need for try-catch around validation because it won’t throw an error; it returns a structured result instead, making it safer and easier to handle validation results directly.

### Handling Validation Failure
```javascript
if (!parsedDataWithSuccess.success) {
    return res.status(403).json({
        message: "Invalid format of email or minimum password is 6 characters",
        errors: parsedDataWithSuccess.error.errors  // Gives details about validation errors
    });
}
```
- **Explanation**: This conditional check determines whether the validation was successful.
  - **If validation fails** (`success` is `false`): A `403` status response is sent, along with a `message` indicating the reason for failure and an `errors` field containing details of the validation errors.
  - **If validation succeeds**: The code continues with further processing (i.e., hashing the password and creating the user record).

### Explanation in the Code Comment
- The code comment explains the advantages of `safeParse` and describes the structure of the returned object:
  ```javascript
  /*
      {
          success: true || false,
          data: {}  // Contains the validated data if success is true
          errors: {}  // Contains error details if success is false
      } 
  */
  ```
This helps developers understand the benefits of `safeParse` (i.e., no need for a try-catch around validation) and the structure of the result object.

### Summary of the Zod Portion
- **Purpose**: Ensures incoming data meets specified criteria before proceeding.
- **Method**: Uses `safeParse` to safely check data without risking a backend crash.
- **Outcome**: Validation feedback is provided in a structured way, allowing for clear error messaging if the format or content of incoming data is invalid.