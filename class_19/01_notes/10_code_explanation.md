## 🧩 The code you wrote (simplified view)

```jsx
function FetchData() {
  const [currentTab, setCurrentTab] = useState("")
  const [currentTabno, setCurrentTabno] = useState(1)
  const [loading, setLoading] = useState(false)
  const [tabData, setTabdata] = useState({})

  useEffect(() => {
    setLoading(true)
    fetch("https://jsonplaceholder.typicode.com/todos/" + currentTabno)
      .then(async res => {
        const data = await res.json()
        setTabdata(data)
        setLoading(false)
      })
  }, [currentTabno])

  return (
    <>
      <div className="nav">
        <button onClick={() => { setCurrentTab("feed"); setCurrentTabno(1); }}
                style={{ color: currentTab == "feed" ? 'red' : 'gray' }}>feed</button>

        <button onClick={() => { setCurrentTab("notification"); setCurrentTabno(2); }}
                style={{ color: currentTab == "notification" ? 'red' : 'gray' }}>notification</button>

        <button onClick={() => { setCurrentTab("messege"); setCurrentTabno(3); }}
                style={{ color: currentTab == "messege" ? 'red' : 'gray' }}>messege</button>

        <button onClick={() => { setCurrentTab("jobs"); setCurrentTabno(4); }}
                style={{ color: currentTab == "jobs" ? 'red' : 'gray' }}>jobs</button>
      </div>

      {loading ? "loading..." : tabData.title}
    </>
  )
}
```

---

## 🧠 Step-by-step visualization of what’s happening

### 🪄 1. When the component first loads (mounts)

* `currentTab = ""`
* `currentTabno = 1`
* `loading = false`
* `tabData = {}`

Then React runs the `useEffect()` because it depends on `[currentTabno]` — and initially `currentTabno` is `1`.

```
useEffect triggered → fetch(".../1")
```

So it:

1. sets `loading = true`
2. fetches `https://jsonplaceholder.typicode.com/todos/1`
3. waits for data
4. sets `tabData` with that fetched JSON (e.g., `{ id: 1, title: "delectus aut autem" }`)
5. sets `loading = false`

---

### 🧩 2. What the UI looks like initially

```
[feed] [notification] [messege] [jobs]

loading...
```

Once data is fetched:

```
[feed] [notification] [messege] [jobs]

delectus aut autem
```

---

### 🎨 3. What happens when you click on a button

Let’s say you click **notification**:

```js
setCurrentTab("notification")
setCurrentTabno(2)
```

Now:

* `currentTab` becomes `"notification"`
* `currentTabno` becomes `2`

This triggers a **re-render** because state changed.
Then the `useEffect` runs again because its dependency `[currentTabno]` changed.

```
useEffect triggered → fetch(".../2")
```

It fetches the new data (`/todos/2`), shows `"loading..."` for a moment,
then shows that new todo’s title.

---

### 📊 4. Visual Timeline of React’s behavior

| Step | Action               | What React does                     | UI shown            |
| ---- | -------------------- | ----------------------------------- | ------------------- |
| 1    | Component mounts     | fetch `/todos/1`                    | `loading...`        |
| 2    | Data arrives         | update `tabData`                    | shows todo #1 title |
| 3    | Click “notification” | sets tab to `notification`, tabno=2 | `loading...`        |
| 4    | Data arrives         | update `tabData`                    | shows todo #2 title |
| 5    | Click “jobs”         | sets tab to `jobs`, tabno=4         | `loading...`        |
| 6    | Data arrives         | update `tabData`                    | shows todo #4 title |

---

### 🎨 5. Button Color Logic (Conditional Rendering)

This line:

```jsx
style={{ color: currentTab == "feed" ? 'red' : 'gray' }}
```

means:

* When you click a tab, `currentTab` becomes that tab’s name.
* React checks: if this button’s name matches `currentTab`, color it red; otherwise gray.

🧱 Visual:

| currentTab     | feed button | notification button | message button | jobs button |
| -------------- | ----------- | ------------------- | -------------- | ----------- |
| "feed"         | 🔴 red      | ⚫ gray              | ⚫ gray         | ⚫ gray      |
| "notification" | ⚫ gray      | 🔴 red              | ⚫ gray         | ⚫ gray      |
| "messege"      | ⚫ gray      | ⚫ gray              | 🔴 red         | ⚫ gray      |
| "jobs"         | ⚫ gray      | ⚫ gray              | ⚫ gray         | 🔴 red      |

---

### 🧭 6. What the `useEffect` dependency `[currentTabno]` means

It means:

> “Run this effect **only when `currentTabno` changes**.”

If you change only `currentTab`, the effect does **not** re-run.
But since every button changes both, it works fine.

This prevents **unnecessary fetches** when only text or color changes.

---

### ⚙️ 7. What React is doing behind the scenes

Let’s visualize React’s internal memory:

```
State:
 ├── currentTab: "feed"
 ├── currentTabno: 1
 ├── loading: false
 └── tabData: { id: 1, title: "delectus aut autem" }

When a button is clicked:
  -> React updates state (new copy)
  -> React re-renders the component with new values
  -> useEffect detects change → refetch data
  -> UI updates again with new data
```

---

### 🧩 8. Conceptual Summary

| Part                  | Purpose                                                            |
| --------------------- | ------------------------------------------------------------------ |
| `useState`            | stores values that change over time (tab name, tab number, etc.)   |
| `useEffect`           | runs side effects (like fetching data) when `currentTabno` changes |
| `fetch(...)`          | gets new data from an API                                          |
| `setLoading`          | controls “loading...” text visibility                              |
| Conditional Rendering | shows either “loading…” or `tabData.title`                         |
| Button Styles         | highlight the current tab visually                                 |

---

### 🖼️ Final Visual Flow

```
[feed] [notification] [messege] [jobs]
   ↓          ↓             ↓         ↓
 onClick → setCurrentTab + setCurrentTabno
   ↓
 useEffect detects tabno change
   ↓
 fetch new data from API
   ↓
 setLoading(true) → shows "loading..."
   ↓
 setTabdata(newData), setLoading(false)
   ↓
 show new tabData.title
```
