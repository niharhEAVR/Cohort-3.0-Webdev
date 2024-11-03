Here's a step-by-step guide to run and test this code with the specified `POST` data, using tools like **Node.js** and **Postman**.

---

### Step 1: Save and Run the Code

1. **Save the Code** in a file, such as `server.js`.
2. **Open a Terminal** and navigate to the directory where `server.js` is saved.
3. Run the server using Node.js:
   ```bash
   node server.js
   ```
4. Confirm the server is running; you should see:
   ```
   Your server is running on http://localhost:3000
   ```

---

### Step 2: Add Initial Users with POST Requests (via Postman)

For each of the users, you’ll send a **POST** request in Postman.

1. **Open Postman** and create a new request.
2. **Set the Method** to `POST`.
3. **Enter the URL**: `http://localhost:3000/`.
4. **Go to the "Body" tab**, select `raw`, and set the format to `JSON`.
5. **Add JSON Data** for each user and **send each request separately**.

   - **User: "william"** (initially in the array, so skip this step for "william")

   - **User: "cooldude"**
     ```json
     {
         "peopleName": "cooldude",
         "peopleKidneys": [
             { "id": "left-kidney", "healthy": true },
             { "id": "Right-kidney", "healthy": false }
         ]
     }
     ```

   - **User: "bhaskar"**
     ```json
     {
         "peopleName": "bhaskar",
         "peopleKidneys": [
             { "id": "left-kidney", "healthy": false },
             { "id": "Right-kidney", "healthy": false }
         ]
     }
     ```

   - **User: "prabhas"**
     ```json
     {
         "peopleName": "prabhas",
         "peopleKidneys": [
             { "id": "left-kidney", "healthy": true },
             { "id": "Right-kidney", "healthy": true }
         ]
     }
     ```

6. After each POST request, you should get a response saying `"Done"`, indicating that the user data has been successfully added.

---

### Step 3: Verify Users with a GET Request

1. **Open a Browser** and navigate to `http://localhost:3000/`.
2. You should see a JSON array showing all users, including `"william"`, `"cooldude"`, `"bhaskar"`, and `"prabhas"`.

---

### Step 4: Delete Unhealthy Kidneys with DELETE Request

1. **In Postman**, create a new request.
2. **Set the Method** to `DELETE`.
3. **Enter the URL**: `http://localhost:3000/`.
4. **Send the Request**. You should get a response `"Done"`.

This `DELETE` request filters out all unhealthy kidneys for each user.

---

### Step 5: Verify Deletion of Unhealthy Kidneys with a GET Request

1. **Open the browser** (or refresh it if already open) at `http://localhost:3000/`.
2. You should see that each user’s kidneys array now only includes kidneys with `"healthy": true`.

---

### Example Final Output

The final response after the DELETE request should look something like this:

```json
{
    "users": [
        {
            "name": "william",
            "kidneys": [
                {
                    "id": "Right-kidney",
                    "healthy": true
                }
            ]
        },
        {
            "name": "cooldude",
            "kidneys": [
                {
                    "id": "left-kidney",
                    "healthy": true
                }
            ]
        },
        {
            "name": "bhaskar",
            "kidneys": []
        },
        {
            "name": "prabhas",
            "kidneys": [
                {
                    "id": "left-kidney",
                    "healthy": true
                },
                {
                    "id": "Right-kidney",
                    "healthy": true
                }
            ]
        }
    ]
}
```

This shows:
- `"william"` has only the healthy `Right-kidney`.
- `"cooldude"` has only the healthy `left-kidney`.
- `"bhaskar"` has no kidneys left, as both were unhealthy.
- `"prabhas"` retains both healthy kidneys.