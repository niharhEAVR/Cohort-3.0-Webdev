To see the changes made by your `POST`, `GET`, and `PUT` requests, follow these steps:

### Step 1: Start Your Server
Run your code in the terminal:
```bash
node <filename>.js
```
Ensure the server is running and listening on `http://localhost:3000`.

### Step 2: Send a POST Request to Add Data

1. **Open Postman** and create a new request.
2. **Set the Method** to `POST`.
3. **Enter the URL** as `http://localhost:3000/`.
4. **Go to the "Body" tab**, select `raw`, and set the format to `JSON`.
5. **Enter JSON Data** in the Body section (as you provided):
   ```json
   {
       "peopleName": "cooldude",
       "peopleKidneys": [
           {
               "id": "left-kidney",
               "healthy": false
           },
           {
               "id": "Right-kidney",
               "healthy": false
           }
       ]
   }
   ```
6. **Send the Request**. You should receive the response `Done`, indicating that the data was successfully added to the `users` array.

### Step 3: View the Updated Data with a GET Request

1. **Open a Web Browser** (like Chrome, Firefox, etc.).
2. Enter the URL `http://localhost:3000/` and press Enter.
3. You should see a JSON response showing the `users` array with the newly added user, `cooldude`, along with their kidney data.

#### Example Response:
After the POST request, the data should look like this:
```json
{
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
            "name": "cooldude",
            "kidneys": [
                {
                    "id": "left-kidney",
                    "healthy": false
                },
                {
                    "id": "Right-kidney",
                    "healthy": false
                }
            ]
        }
    ]
}
```

### Step 4: Send a PUT Request to Update Kidney Health Status

1. **In Postman**, create a new request.
2. **Set the Method** to `PUT`.
3. **Enter the URL** as `http://localhost:3000/`.
4. **Send the Request**. You should receive the response `Done`, indicating that all kidneys have been updated to `healthy: true`.

### Step 5: Verify the Changes with Another GET Request

1. **Open the browser** (or refresh it if already open) and go to `http://localhost:3000/` again.
2. You should now see that all `kidneys` objects have `healthy` set to `true`.

#### Example Response after the PUT Request:
```json
{
    "users": [
        {
            "name": "william",
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
        },
        {
            "name": "cooldude",
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

### Summary
- **POST Request**: Adds a new user with kidney details.
- **GET Request**: Retrieves the current data.
- **PUT Request**: Updates all kidney health statuses to `true`.
- **GET Request** (again): Confirms the update to kidney health statuses.