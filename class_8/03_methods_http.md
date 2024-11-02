HTTP (Hypertext Transfer Protocol) defines several **methods** (or verbs) that specify the desired action to be performed on a given resource. Each method serves a different purpose, mainly in RESTful APIs and web services, by indicating what the client wants to do with a resource on the server.

Here are the primary HTTP methods:

### 1. **GET**
   - **Purpose**: Retrieve data from a server.
   - **Characteristics**: Safe (doesn’t modify resources) and idempotent (multiple identical requests have the same result).
   - **Example**: Used to load web pages or retrieve data in APIs.
   - **Typical Use Case**: `GET /users` to retrieve a list of users.

### 2. **POST**
   - **Purpose**: Submit data to the server, often resulting in a new resource being created.
   - **Characteristics**: Not idempotent (repeated requests may create duplicate resources).
   - **Example**: Used to submit forms, create new users, upload files.
   - **Typical Use Case**: `POST /users` to create a new user with provided data.

### 3. **PUT**
   - **Purpose**: Update or completely replace an existing resource.
   - **Characteristics**: Idempotent (sending the same request multiple times results in the same outcome).
   - **Example**: Updating a user’s profile information.
   - **Typical Use Case**: `PUT /users/1` to update the user with ID 1, replacing the entire user resource.

### 4. **PATCH**
   - **Purpose**: Partially update an existing resource.
   - **Characteristics**: Idempotent (applying the same patch repeatedly leads to the same end state).
   - **Example**: Updating a single field, such as an email or username, without replacing the entire resource.
   - **Typical Use Case**: `PATCH /users/1` to update only specific attributes, like changing the email for user ID 1.

### 5. **DELETE**
   - **Purpose**: Remove a resource.
   - **Characteristics**: Idempotent (deleting the same resource multiple times has the same result after the first deletion).
   - **Example**: Removing a specific user.
   - **Typical Use Case**: `DELETE /users/1` to delete the user with ID 1.

### 6. **HEAD**
   - **Purpose**: Similar to GET, but only retrieves the headers and not the body of the response.
   - **Characteristics**: Useful for checking if a resource exists or retrieving metadata.
   - **Example**: Testing if a webpage has changed by looking at the `Last-Modified` header.
   - **Typical Use Case**: `HEAD /users/1` to get headers for user ID 1 without downloading the full content.

### 7. **OPTIONS**
   - **Purpose**: Describe the communication options for the target resource, often used for CORS (Cross-Origin Resource Sharing) requests.
   - **Characteristics**: Used to determine the allowed methods on a resource.
   - **Example**: Determining if `GET` and `POST` are supported on a resource.
   - **Typical Use Case**: `OPTIONS /users` to list the HTTP methods allowed on the `/users` endpoint.

### 8. **TRACE**
   - **Purpose**: Echoes the received request back to the client, used for debugging.
   - **Characteristics**: Provides a way to see how requests are modified or altered by intermediate servers.
   - **Example**: Testing intermediaries or proxies.
   - **Typical Use Case**: `TRACE /users/1` to see the exact request received by the server.

### 9. **CONNECT**
   - **Purpose**: Establishes a tunnel to the server, often used for SSL/TLS connections.
   - **Characteristics**: Typically used to create a secure, encrypted connection.
   - **Example**: Used with proxies to establish an HTTPS connection.
   - **Typical Use Case**: `CONNECT example.com:443` for HTTPS connections.

---

### Summary

In most web and API interactions, the methods **GET**, **POST**, **PUT**, **PATCH**, and **DELETE** are the most commonly used. The others like **OPTIONS**, **HEAD**, **TRACE**, and **CONNECT** serve more specialized roles, often in security, debugging, and connection management. Each method's idempotency, safety, and side effects are important for designing reliable and REST-compliant web applications.