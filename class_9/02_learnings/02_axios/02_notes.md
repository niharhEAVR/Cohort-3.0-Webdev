## code snippets one
```javascript
(async ()=>{
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1")
    let data = await response.json()
    let user_name = data.name
    let company_name = data.company.name
    document.querySelector(".posts").innerHTML = Dummy API call user's name = ${user_name} <br> Company name = ${company_name}
})()
```

## code snippets two 
```javascript
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.6/axios.min.js"></script>
<script>
(async()=>{
    let response = await axios.get("https://jsonplaceholder.typicode.com/users/1")

    document.querySelector(".posts").innerHTML = Dummy user name: ${response.data.name}
})()
</script>
```

The two code snippets are making a request to the same API (`https://jsonplaceholder.typicode.com/users/1`) and displaying user information, but they use different methods: **Fetch API** in the first snippet and **Axios** in the second. Here’s a breakdown of their differences:

### 1. **API Used**
   - **First Snippet**: Uses the **Fetch API**, which is a built-in browser function to make HTTP requests.
   - **Second Snippet**: Uses **Axios**, a third-party library loaded from a CDN.

### 2. **Data Extraction**
   - **Fetch API**: Requires you to manually extract JSON data by calling `response.json()`. This is necessary because `fetch` does not automatically parse JSON.
     ```javascript
     let data = await response.json();
     ```
   - **Axios**: Automatically parses JSON, so `response.data` gives you the data directly.
     ```javascript
     let response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
     ```

### 3. **Error Handling**
   - **Fetch API**: By default, Fetch doesn’t throw an error for HTTP status codes that indicate failure (e.g., 404 or 500). It only throws errors for network-related issues. Therefore, you’d need extra code to handle HTTP errors.
   - **Axios**: Automatically throws an error if the response status code indicates a failure, making error handling easier and more reliable.


### 4. **Code Example Comparison**
Here’s a more streamlined version of each:

**Using Fetch**:
```javascript
(async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    let data = await response.json();
    document.querySelector(".posts").innerHTML = `Dummy API call user's name = ${data.name} <br> Company name = ${data.company.name}`;
})();
```

**Using Axios**:
```javascript
(async () => {
    let response = await axios.get("https://jsonplaceholder.typicode.com/users/1");
    document.querySelector(".posts").innerHTML = `Dummy user name: ${response.data.name}`;
})();
```

### Summary
- **Fetch** requires manually handling JSON parsing (`response.json()`), while **Axios** handles it automatically.
- **Axios** has built-in error handling for HTTP status errors, making it easier to manage failures.
- **Fetch** is built into the browser, whereas **Axios** requires an external library.