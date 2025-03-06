### What is a `<canvas>`?

A `<canvas>` is an HTML element that allows you to draw graphics using JavaScript. It's essentially a blank area where you can render 2D or 3D graphics dynamically, such as shapes, animations, charts, or even games.

The `<canvas>` element provides a **drawing surface**, but it does not render anything on its own. You need to use JavaScript and the **Canvas API** to draw onto it.

---

### What is happening in the code?

1. **`useRef()` is used to reference the canvas element**  
   ```js
   const c = useRef();
   ```
   - `useRef()` is used to create a reference to the `<canvas>` element.
   - `c.current` will point to the actual `<canvas>` DOM element after the component renders.

2. **Using `useEffect()` to draw on the canvas**  
   ```js
   useEffect(() => {
     const ctx = c.current.getContext("2d");
   ```
   - `useEffect(() => {...}, [])` ensures the drawing logic runs **only once** when the component mounts.
   - `c.current.getContext("2d")` gets the **2D rendering context**, which allows drawing on the canvas.

3. **Drawing a red shape on the canvas**  
   ```js
   ctx.beginPath();
   ctx.moveTo(20, 20); // Move to starting point (20,20)
   ctx.lineTo(20, 100); // Draw a line from (20,20) to (20,100)
   ctx.lineTo(70, 100); // Draw a line from (20,100) to (70,100)
   ctx.strokeStyle = "red"; // Set line color to red
   ctx.stroke(); // Draw the path
   ```
   - This code draws two connected lines forming an **incomplete triangle** with red strokes.

4. **Rendering the `<canvas>` element**  
   ```js
   <canvas ref={c} className="w-150 h-75 border-2 border-black"></canvas>
   ```
   - The `ref={c}` connects the `<canvas>` element to the `useRef()` reference.
   - Tailwind classes (`w-150 h-75 border-2 border-black`) set the width, height, and border.

---

### Final Outcome:
This code will render a `<canvas>` with a **red incomplete triangle**, and a black border around it.

Let's break it down clearly! The **canvas coordinate system** works like this:

- The **top-left corner** of the canvas is **(0, 0)**.
- The **X-axis** increases **to the right**.
- The **Y-axis** increases **downward**.

Now, let's go step by step through your drawing commands:

---

### 1️⃣ **Start at (20, 20)**  
```js
ctx.moveTo(20, 20);
```
- This moves the "pen" to **(20, 20)**.
- **X = 20 pixels from the left**, **Y = 20 pixels from the top**.

---

### 2️⃣ **Draw a line from (20, 20) → (20, 100)**  
```js
ctx.lineTo(20, 100);
```
- **X = 20 (same as before, no change in left/right position).**
- **Y = 100 (moving downward by 80 pixels).**
- This creates a **vertical line going down**.

---

### 3️⃣ **Draw a line from (20, 100) → (70, 100)**  
```js
ctx.lineTo(70, 100);
```
- **X moves from 20 → 70** (moving **right** by 50 pixels).
- **Y stays at 100** (same vertical level).
- This creates a **horizontal line to the right**.

---

### 4️⃣ **Does it look like a triangle?**
At this point, you have only drawn an **L-shape**, not a closed triangle.  

To complete the triangle, you need to draw a final line:

```js
ctx.lineTo(20, 20); // Back to the starting point
```
- This connects (70, 100) **back to (20, 20)**, closing the shape.

OR, you can use:
```js
ctx.closePath();
```
which **automatically connects the last point to the first point**.

---

### 🔺 **Final Shape**
After adding the last line, the shape forms a **right-angled triangle**:

- (20, 20) → (20, 100) **(downward)**
- (20, 100) → (70, 100) **(right)**
- (70, 100) → (20, 20) **(diagonal back up to the start)**

This makes a **right triangle with the right angle at (20, 100)**.

---

### 🔥 **Key Takeaways**
- The **Y-axis increases downward**, not upward.
- Each `lineTo(x, y)` draws a **line from the last position** to the new coordinates.
- To create a closed shape, connect the last point back to the starting point.