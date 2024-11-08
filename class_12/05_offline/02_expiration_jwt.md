To expire a JWT after generating it, you can set an expiration time when creating the token. Here’s how you can do it and what options you have:

### 1. **Set Expiration Time at Creation**
   - When you create the JWT, you can specify an expiration time using the `exp` claim (typically in seconds from the current time). Most JWT libraries, like `jsonwebtoken` in Node.js, support setting expiration easily.

   In Node.js, for example:
   ```javascript
   const jwt = require('jsonwebtoken');

   // Set the token to expire in 1 hour
   const token = jwt.sign({ username: 'user123' }, 'your_secret_key', { expiresIn: '1h' });
   ```

   - Here, `{ expiresIn: '1h' }` means the token will automatically expire 1 hour from its generation. You can use other time formats like `'30m'` (30 minutes) or `'2d'` (2 days) as well.

### 2. **Check Expiration at Every Request**
   - When the token is received on the server for a request, your server should validate it and check if it’s expired. Most JWT libraries handle this automatically when verifying the token.
   
   For example:
   ```javascript
   jwt.verify(token, 'your_secret_key', (err, decoded) => {
       if (err) {
           // Token is expired or invalid
           return res.status(401).json({ message: 'Token expired or invalid' });
       }
       // Token is valid, proceed with request
       console.log(decoded);
   });
   ```

### 3. **Manually Expire a Token**
   - If you want to expire a token before its set expiration time (for example, logging a user out), you can:
     - **Blacklist the Token:** Maintain a list of invalidated tokens on the server. Each time a request is made, check if the token is blacklisted.
     - **Change the Secret Key:** If you change the secret key used to sign tokens, all previously generated tokens become invalid. This, however, will also invalidate all users’ tokens at once.

### 4. **Use Refresh Tokens for Extra Security**
   - If you need to keep users logged in for long periods but want to rotate tokens frequently for security, you can use a **refresh token** system. Here, the access token expires quickly, but users can get a new one with a valid refresh token, reducing the risk of long-lasting, potentially compromised tokens.

Using these methods will help manage and control the lifespan of your JWTs effectively!