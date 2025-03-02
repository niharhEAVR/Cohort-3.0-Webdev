```jsx
import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <>
    <div className="bg-gray-400 h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

function Layout() {
  return <div>
    <Link to="/">Home Page</Link>
    |
    <Link to="/signup">Signup</Link>
    |
    <Link to="/signin">Signin</Link>
    <Outlet />
  </div>
}


export default App
```

# i dont want to show signup and signin in the dashboard route

To hide the `Signup` and `Signin` links when you're on the `Dashboard` or `SendMoney` routes, you can conditionally render the links based on the current pathname using `useLocation` from `react-router-dom`. Here's how you can do it:

```jsx
import { BrowserRouter, Route, Routes, Link, Outlet, useLocation } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <div className="bg-gray-400 h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const hideAuthLinks = ["/dashboard", "/send"].includes(location.pathname);

  return (
    <div>
      <Link to="/">Home Page</Link> |{" "}
      {!hideAuthLinks && (
        <>
          <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default App;
```

### Explanation:
1. **`useLocation` Hook:** Retrieves the current URL path.
2. **`hideAuthLinks` Variable:** Checks if the current path is `/dashboard` or `/send`.
3. **Conditional Rendering:** If the current path is not in the restricted routes, show `Signup` and `Signin` links.

This approach is scalable and easy to modify if you add more routes in the future!

---
---
---


# and a logout link which if been presses then the token will remove from the localstorage and back to home page

To add a "Logout" link that clears the token from `localStorage` and redirects to the home page, you can modify the `Layout` component as follows:

```jsx
import { BrowserRouter, Route, Routes, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <div className="bg-gray-400 h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideAuthLinks = ["/dashboard", "/send"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      <Link to="/">Home Page</Link> |{" "}
      {!hideAuthLinks ? (
        <>
          <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="text-blue-500 underline ml-2">
          Logout
        </button>
      )}
      <Outlet />
    </div>
  );
}

export default App;
```

### Explanation:
1. **`useNavigate` Hook:** Allows programmatic navigation.
2. **`handleLogout` Function:**
   - Removes the `"token"` from `localStorage` using `localStorage.removeItem("token")`.
   - Redirects to the home page using `navigate("/")`.
3. **Conditional Rendering:** Shows the "Logout" button only on the `Dashboard` and `SendMoney` routes.
4. **Button Style:** Added basic styling to the logout button for better visibility.

With this implementation, the app will log out and return to the home page when the logout button is clicked.

---
---
---


# i dont want the homepage link in dashboard also

To hide the "Home Page" link as well when on the `Dashboard` or `SendMoney` routes, you can update the `Layout` component like this:

```jsx
import { BrowserRouter, Route, Routes, Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";

function App() {
  return (
    <div className="bg-gray-400 h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<SendMoney />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardRoute = ["/dashboard", "/send"].includes(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to home page
  };

  return (
    <div>
      {!isDashboardRoute ? (
        <>
          <Link to="/signup">Signup</Link> | <Link to="/signin">Signin</Link> |{" "}
          <Link to="/">Home Page</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="text-blue-500 underline">
          Logout
        </button>
      )}
      <Outlet />
    </div>
  );
}

export default App;
```

### Key Changes:
1. **`isDashboardRoute` Check:** Determines whether the current route is either `Dashboard` or `SendMoney`.
2. **Conditional Rendering:**
   - When not on `Dashboard` or `SendMoney`, show `Signup`, `Signin`, and `Home Page` links.
   - When on `Dashboard` or `SendMoney`, show only the `Logout` button.
3. **Simplified Code:** Combined all non-dashboard links under one condition, making it cleaner and easier to maintain.

With this setup, the navigation bar will automatically adapt based on the current route, ensuring only relevant links are displayed.

---
---
---


```js
const { User } = require("./db")
const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({
            message: "Token missing or unauthorized"
        });
    }

    try {
        const decodedJWT = jwt.verify(token, "secret");

        console.log(decodedJWT)

        const checkUser = await User.findOne({
            _id: decodedJWT.userID
        });

        if (checkUser) {
            req._id = checkUser._id
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized user"
            });
        }
    } catch (error) {
        res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = {
    auth
}
```


# if i am storing the token in localstorage then i can i send it to heads

If you're storing the token in `localStorage`, you can send it in the request headers using the `Authorization` header with the `Bearer` format. Here's how to do it:

### 1. **Set Token in LocalStorage:**
```js
localStorage.setItem("token", "your_jwt_token_here");
```

### 2. **Send Token in Request Headers:**

#### **Using `fetch`:**
```js
const token = localStorage.getItem("token");

fetch("http://localhost:5000/protected-route", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

#### **Using Axios:**
```js
import axios from "axios";

const token = localStorage.getItem("token");

axios.get("http://localhost:5000/protected-route", {
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
.then(response => console.log(response.data))
.catch(error => console.error('Error:', error));
```

---

### 3. **Update Your `auth` Middleware:**

Update your middleware to handle the `Bearer` format properly:

```js
const { User } = require("./db");
const jwt = require('jsonwebtoken');

async function auth(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Token missing or unauthorized"
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedJWT = jwt.verify(token, "secret");

        const checkUser = await User.findOne({ _id: decodedJWT.userID });

        if (checkUser) {
            req._id = checkUser._id;
            next();
        } else {
            res.status(401).json({ message: "Unauthorized user" });
        }
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = { auth };
```

---

### ✅ **Benefits of This Approach:**
- **Security:** Using the `Authorization` header with `Bearer` is a standard practice.
- **Consistency:** Many libraries and backends expect the token in this format.
- **Flexibility:** Easily extendable if you decide to switch to other authentication strategies.

This setup will make your authentication flow more robust and secure!


---
---
---


```jsx
import axios from "axios"
import { useState } from "react";

export const Balance = async () => {

    const [balance, setbalance] = useState(5000)
    const token = localStorage.getItem("token");

    await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
            "token": token
        }
    }).then(response => setbalance(balance => {balance=response.data.balance}))

    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}
```



# why is this is not working?


The issue with your code is primarily due to how you are using `useState` and `async` with React components. Here's what's wrong and how to fix it:

### 🛠️ **Issues:**
1. **Incorrect Component Definition:** React components should not be `async`. Instead, use `useEffect` to handle side effects like API calls.
2. **Incorrect `useState` Syntax:** The `setbalance` callback is not properly updating the state.
3. **Side Effect Execution:** Side effects (like fetching data) should be managed within `useEffect` to avoid running on every render.
4. **Mutation in State Update:** The `balance` variable is not being set correctly in the `setbalance` function.

---

### ✅ **Fixed Code:**

```jsx
import axios from "axios";
import { useState, useEffect } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(5000);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        "Authorization": `Bearer ${token}` // Use Bearer format
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();
    }, []); // Empty dependency array means this runs once on component mount

    return (
        <div className="flex">
            <div className="font-bold text-lg">
                Your balance
            </div>
            <div className="font-semibold ml-4 text-lg">
                Rs {balance}
            </div>
        </div>
    );
};
```

---

### 🚀 **What's Improved:**
1. **Use `useEffect` for Async Calls:**
   - Ensures the API call runs only once when the component mounts.
   - Avoids unnecessary re-renders or infinite loops.

2. **Proper State Update:**
   - `setBalance(response.data.balance)` directly updates the state.

3. **Error Handling:**
   - Added `try...catch` block to handle API errors gracefully.

4. **Authorization Header:**
   - Changed to `Authorization: Bearer ${token}`, which is a best practice for authentication.

---

### 🔍 **Why Your Code Didn't Work:**
1. The `async` component definition led to rendering issues.
2. The `setbalance` function was not updating state correctly (`{balance = response.data.balance}` is invalid syntax).
3. Without `useEffect`, the fetch call might be repeatedly invoked, causing unpredictable behavior.

This updated code should now correctly fetch and display the balance!