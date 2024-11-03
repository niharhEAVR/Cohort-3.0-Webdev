### Code Explanation

#### Step 1: Importing Express
```javascript
const express = require('express');
const app = express();
```
- We import the Express library, a popular framework for Node.js that simplifies creating server-side applications.
- `app` is an instance of Express that will handle our routes and requests.

#### Step 2: Defining the `calculateSum` Function
```javascript
function calculateSum(num) {
    let sum = 0;
    for (let i = 0; i <= num; i++) {
        sum += i;
    }
    return sum;
}
```
- The `calculateSum` function takes a number (`num`) as input.
- It initializes `sum` to 0.
- Then, it loops from `0` to `num` (inclusive) and adds each number to `sum`.
- Finally, it returns the total sum. For example, if `num` is 5, it calculates `0 + 1 + 2 + 3 + 4 + 5 = 15`.

#### Step 3: Setting Up the Route
```javascript
app.get('/', function (req, res) {
    const num = parseInt(req.query.num);  // Convert query parameter to integer
    const answer = calculateSum(num);
    res.send(answer.toString());  // Send the answer as a string
});
```
- `app.get('/', ...)` sets up a route at the root URL (`/`). When someone accesses this URL, the provided function handles the request.
- Inside the function:
  - `req.query.num` extracts the `num` query parameter from the URL. The query parameter `num` is the input we get from the user.
  - `parseInt(req.query.num)` converts `num` to an integer, as URL parameters are typically strings.
  - `calculateSum(num)` calls the function to calculate the sum.
  - `res.send(answer.toString())` sends the result back to the client as a string.

#### Step 4: Starting the Server
```javascript
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
```
- `app.listen(3000, ...)` starts the server on port 3000.
- When the server is running, it will log `Server is running on http://localhost:3000`.

### Getting Input from the User
In this code, the input is provided through the URL as a query parameter.

1. **Start the server** by running the file in the terminal:
   ```bash
   node <filename>.js
   ```

2. **Open a web browser** or another tool like Postman and go to:
   ```
   http://localhost:3000/?num=20
   ```
   Here, `?num=20` is the query parameter, where `num` is the input and `20` is the value you're passing.

3. **Check the Response**:
   - The browser should display the sum result.

---

To access the same URL on your mobile device, your mobile and the computer running the code need to be on the **same Wi-Fi network**. Here’s how you can set it up:

### 1. Find Your Computer's Local IP Address
On your computer, find its local IP address (different from the public IP) so your mobile can connect to it.

- **Windows**:
  1. Open Command Prompt.
  2. Type `ipconfig` and press Enter.
  3. Look for the "IPv4 Address" under your active network connection. It will look something like `192.168.x.x`.

- **Mac**:
  1. Open Terminal.
  2. Type `ifconfig` and press Enter.
  3. Look for `inet` under your active network (e.g., `en0`). It will look something like `192.168.x.x`.

- **Linux**:
  1. Open Terminal.
  2. Type `hostname -I` and press Enter.
  3. You should see an IP like `192.168.x.x`.

### 2. Update the `app.listen` Code (Optional- If you dont do it sitll works on mobile)
To make sure the server is accessible from other devices on the network, you can change:
```javascript
app.listen(3000);
```
to:
```javascript
app.listen(3000, '0.0.0.0');
```
This tells the server to listen on all network interfaces, allowing external devices on the same network to access it.

### 3. Start the Server
In your terminal, run the server with:
```bash
node <filename>.js
```

### 4. Access the URL on Your Mobile Device
1. Open a browser on your mobile.
2. In the address bar, enter:
   ```
   http://<computer's IP>:3000/?num=20
   ```
   For example, if your computer’s IP is `192.168.1.10`, you would type:
   ```
   http://192.168.1.10:3000/?num=20
   ```

You should see the result on your mobile, just like you would on your computer's browser.