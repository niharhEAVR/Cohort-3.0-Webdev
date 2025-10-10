# First revise all the codes in the 02_learnings folder then read this note

---

### How Authentication Works

1. **Sign Up**: When a user goes to a website and signs up, their information (like username and password) is stored in the website’s database.

2. **Sign In**: When the user later tries to sign in, the website checks if the username and password provided match what was stored during sign-up.

3. **Token Issuance**: If the credentials are correct, the website generates a token for the user. This token acts as a key or pass for accessing certain parts of the website.

4. **Token-Based Access**: With this token, the user can now access protected routes or areas of the website. The token is sent along with each request, allowing the website to verify the user’s identity without needing them to sign in again.

---

This process is common for most web applications that require user authentication. The token is often a **JWT** (JSON Web Token), which contains encoded information about the user and can be verified for security.