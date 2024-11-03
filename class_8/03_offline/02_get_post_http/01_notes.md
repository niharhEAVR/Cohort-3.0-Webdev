To post data with Postman and view it with a `GET` request in the browser, follow these steps:

### Step 1: Start Your Server
Run your code in the terminal:
```bash
node <filename>.js
```
Ensure the server is running and listening on `http://localhost:3000`.

### Step 2: Send a POST Request with Postman

1. **Open Postman** and create a new request.
2. **Set the Method** to `POST`.
3. **Enter the URL** as `http://localhost:3000/`.
4. **Go to the "Body" tab**, select `raw`, and set the format to `JSON`.
5. **Enter JSON Data** in the Body section:
   ```json
   {
       "peopleName": "Alice"
   }
   ```
6. **Send the Request**. If successful, you should receive the response `Done`, which indicates that the data was added to the `users` array.

### Step 3: View Data with a GET Request in the Browser

1. **Open a Web Browser** (like Chrome, Firefox, etc.).
2. Enter the URL `http://localhost:3000/` and press Enter.
3. You should see a JSON response that includes:
   - `leftKidneyHealthStatus`: the health status of the left kidney.
   - `healthyKidney`: an array of kidneys that are healthy.
   - `users`: an array of all users, including the new one added with the POST request.

        - How many times you click on the send button on the postman that many times the name get added in the `users` array of objects, means if click on the send button 5 times of same input then 5 times the same user got pushed on that `users` array of objects

### Example Response in Browser (after adding `cooldude`)
The JSON response in the browser should look like this:
```json
{
    "leftKidneyHealthStatus": "Not Healthy",
    "healthyKidney": [
        {
            "id": "Right-kidney",
            "healthy": true
        }
    ],
    "users": [
        {
            "name": "william",
            "kidneys": [
                {
                    "id": "left-kidney",
                    "healthy": false
                },
                {
                    "id": "Right-kidney",
                    "healthy": true
                }
            ]
        },
        {
            "name": "cooldude"
        }
    ]
}
```

This response will show the initial data plus any additional users you’ve added through POST requests.

# Everytime time you restart the node process the users got reseted, then you have to post everything manually again

---

### And one more thing that 
```javascript
res.send("Done")
```
if you dont access the `res` parameter and if you click on the send button in postman then you data will infinite time to actually posted