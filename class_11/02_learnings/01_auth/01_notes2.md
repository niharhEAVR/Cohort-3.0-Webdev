The main difference between a **Bearer token** and a **normal token** lies in the way they're used for authentication, particularly in HTTP requests.

### 1. Bearer Token
- A **Bearer token** is a specific type of token commonly used for **OAuth 2.0** and similar authorization frameworks.
- It is typically passed in the `Authorization` header as `"Bearer <token>"`.
- The term "Bearer" means that whoever "bears" (or holds) the token is authorized to access the resource.
- Example usage in a request:
  ```http
  GET /protected-resource HTTP/1.1
  Host: example.com
  Authorization: Bearer <token>
  ```
- Bearer tokens are often **short-lived** and can be refreshed through a refresh token if necessary, which improves security.

### 2. Normal Token
- A **normal token** could refer to any token that doesn’t follow the specific Bearer schema.
- It may not be passed in the `Authorization` header, or it could be used as a URL parameter, in a custom header, or in a cookie.
- Example usage could be:
  ```http
  GET /protected-resource?token=<token>
  ```
  Or in a custom header:
  ```http
  X-Auth-Token: <token>
  ```

### Key Differences
- **Bearer tokens** are widely standardized and typically indicate that no additional authentication steps are needed beyond possessing the token.
- **Normal tokens** may vary in their usage, may not follow any specific standard, and might not be as secure or flexible without additional context.

**Note**: Bearer tokens are usually the preferred approach for stateless APIs because they provide a clear and secure way to authorize requests.


---


Apart from Bearer tokens, other common types of tokens used for authentication and authorization include:

### 1. **API Key**
   - An API key is a simple token that is often used for identifying the calling project or application, rather than the user.
   - It is usually passed as a query parameter or in a custom header, like `X-API-Key: <api_key>`.
   - API keys are widely used in public APIs and are typically tied to a project or application rather than individual user identities.
   
### 2. **Session Token**
   - Session tokens are created upon user login and stored on the server (e.g., in a session database or server memory).
   - They are often managed through cookies and are common in applications that require server-side sessions.
   - For example, a session token might be stored as `Set-Cookie: sessionId=<session_token>`.

### 3. **JWT (JSON Web Token)**
   - JWTs are a type of token that include a payload (such as user data) and are digitally signed.
   - They’re often used as Bearer tokens but can be used in other contexts as well.
   - Since they’re self-contained, JWTs are commonly used in stateless, serverless applications, as they don’t require server-side session storage.

### 4. **OAuth Tokens (Access and Refresh Tokens)**
   - **Access tokens** are short-lived tokens used to access protected resources. Bearer tokens are a common type of access token.
   - **Refresh tokens** are long-lived tokens used to obtain a new access token when the original expires, allowing the user to remain authenticated without re-entering credentials.
   - OAuth tokens are generally associated with OAuth 2.0 authorization flows.

### 5. **MAC (Message Authentication Code) Token**
   - MAC tokens use cryptographic methods to create a signature, ensuring message integrity.
   - Unlike Bearer tokens, they are more secure in environments that need to ensure that requests haven’t been tampered with, as the signature includes both the token and request details.

Each type has different use cases and security implications, and the choice of token type depends on the specific needs of the application, such as the desired balance between security and simplicity.