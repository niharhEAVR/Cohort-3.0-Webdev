✔️ **BrowserRouter**
✔️ **Routes**
✔️ **Route**
✔️ **Link**
✔️ **useNavigate()**
✔️ **Outlet**

---

# 🏠 1. **BrowserRouter**

### **What it does**

* Wraps your entire React app.
* Enables **client-side routing** (SPA behavior).
* Watches the URL and tells React Router which component to show.

### **Example**

```jsx
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <MainApp />
    </BrowserRouter>
  );
}
```

Without `BrowserRouter`, none of the routing features work.

---

# 📦 2. **Routes**

### **What it does**

* A container that holds all your `<Route>` elements.
* It decides **which route is active** based on the URL.

### **Example**

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
</Routes>
```

`Routes` ensures only **one route is rendered** at a time.

---

# 🛣️ 3. **Route**

### **What it does**

* Maps a URL path → to a **React component**.

### **Example**

```jsx
<Route path="/profile" element={<Profile />} />
```

Now when URL is `/profile`, React Router loads `<Profile />`.

### **Full Example:**

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/products/:id" element={<ProductDetails />} />
</Routes>
```

✔️ Supports dynamic routes like `/products/10`.

---

# 🔗 4. **Link**

### **What it does**

* SPA version of `<a>` tag.
* Navigates between routes **without page reload**.

### **Example**

```jsx
<Link to="/about">Go to About Page</Link>
```

### Why not use `<a>`?

```html
<a href="/about">About</a>
```

This causes **full page reload**.

`<Link>` prevents this and keeps SPA behavior.

---

# 🚀 5. **useNavigate()**

### **What it does**

* Allows **programmatic navigation** (navigate using JavaScript code).
* Useful after login, submitting a form, deleting item, etc.

### **Example: Navigate after login**

```jsx
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // do login logic
    navigate("/dashboard");
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

When login succeeds → move to `/dashboard`.

### More examples:

```jsx
navigate(-1); // Go back
navigate(1);  // Go forward
navigate("/profile"); // Go to profile
```

---

# 🧩 6. **Outlet**

### **What it does**

* Placeholder where **nested route components** will render.
* Like a container where child routes show up.

---

## 📌 **Example: Nested Routes with Outlet**

### Parent Route

```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="home" element={<Home />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

### DashboardLayout.js

```jsx
import { Outlet, Link } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h1>Dashboard</h1>

      <nav>
        <Link to="home">Home</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />   {/* child pages render here */}
    </div>
  );
}
```

### Result:

| URL                   | What displays in `<Outlet />` |
| --------------------- | ----------------------------- |
| `/dashboard/home`     | `<Home />`                    |
| `/dashboard/settings` | `<Settings />`                |

`Outlet` allows building layouts like:

* Dashboard with sidebar
* Admin panel
* Settings pages
* Nested pages inside pages

---

# 🔥 **Putting Everything Together**

Here is a complete example using all:

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
}

function DashboardLayout() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Dashboard</h2>

      <button onClick={() => navigate("/")}>Go Home</button>

      <nav>
        <Link to="profile">Profile</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Outlet />
    </div>
  );
}

function Profile() {
  return <h3>Profile Page</h3>;
}

function Settings() {
  return <h3>Settings Page</h3>;
}
```

---

# 🎯 Summary Table

| Term              | Purpose                        |
| ----------------- | ------------------------------ |
| **BrowserRouter** | Wraps the app, enables routing |
| **Routes**        | Container for all routes       |
| **Route**         | Maps URL → Component           |
| **Link**          | SPA navigation without reload  |
| **useNavigate()** | Navigate through JS logic      |
| **Outlet**        | Render nested child routes     |
