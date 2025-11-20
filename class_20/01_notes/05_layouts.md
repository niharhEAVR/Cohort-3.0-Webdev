In **React SPAs**, a **layout** is a **common UI structure** that stays the same across multiple pages, while the *inner content* changes based on the route.

It’s the same idea as:

* Sidebar + header + footer always visible
* Only the center content changes when navigating
* Dashboard frame that stays constant
* Navbar that stays at the top for all pages
* App shell

In simple terms:

# ⭐ **Layout = The permanent UI around your pages**

---

# 🧱 **Real-World Example**

Think of:

### Gmail

* Left sidebar (Inbox, Sent, Drafts) → constant
* Top bar → constant
* Only email content changes → dynamic

### Netflix

* Top navigation bar → constant
* Movie grid → changes
* Movie details page → changes

### Amazon Seller Dashboard

* Sidebar menu → constant
* Top bar → constant
* Content area → changes

All SPAs use a **layout to wrap all the dynamic pages**.

---

# ⚛️ **How Layout Works in React**

React Router allows you to create a layout by:

✔️ Creating a parent route → layout
✔️ Using `<Outlet />` → where child pages load

---

# 💡 **Simple Layout Example**

## 📁 File Structure

```
src/
  Layout.js
  Home.js
  About.js
  Contact.js
  App.js
```

---

# 📌 Layout Component (Sidebar + Header)

```jsx
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <header>
        <h1>My Website</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>

      {/* CHILD ROUTES WILL RENDER HERE */}
      <Outlet />

      <footer>
        <p>© 2025 My Website</p>
      </footer>
    </div>
  );
}
```

---

# 📌 App.js

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Parent Route = Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
```

---

# 📌 What Happens Now?

### URL: `/`

* Layout renders
* `<Home />` is shown inside the `<Outlet />`

### URL: `/about`

* Layout stays
* `<About />` loads in `<Outlet />`

### URL: `/contact`

* Layout stays
* `<Contact />` loads in `<Outlet />`

---

# 🎨 Visual Representation

```
 --------------------------------------
|           Header (Layout)             |
 --------------------------------------
| Sidebar (Layout) | Page Content       |
|                  | (Outlet)           |
 --------------------------------------
|           Footer (Layout)             |
 --------------------------------------
```

The **inside area** is controlled by `<Outlet />`.

---

# ✔️ Why Layouts Are Important in SPAs

| Reason      | Why                                  |
| ----------- | ------------------------------------ |
| Consistency | Same headers/footers everywhere      |
| Reusability | Don’t repeat menus on each page      |
| Structure   | Dashboard-style design becomes easy  |
| SPA feel    | Same container, content changes only |
