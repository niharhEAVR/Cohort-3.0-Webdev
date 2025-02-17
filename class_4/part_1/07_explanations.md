Here's how you can implement the task using three different approaches:  

1. **Callback Hell (Nested `setTimeout`)**  
2. **Promise Chain (Using a Promisified `setTimeout`)**  
3. **Async/Await (Using a Promisified `setTimeout`)**  

---

### **1. Callback Hell (Nested `setTimeout`)**
```javascript
setTimeout(() => {
    console.log("hi");
    setTimeout(() => {
        console.log("hello");
        setTimeout(() => {
            console.log("hello there");
        }, 5000); // Step 3 (5s after step 2)
    }, 3000); // Step 2 (3s after step 1)
}, 1000); // Step 1 (1s)
```
✅ **Pros**: Simple and easy to understand.  
❌ **Cons**: Hard to read and maintain due to deep nesting (callback hell).  

---

### **2. Promise Chain (Using a Promisified `setTimeout`)**
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

delay(1000)
    .then(() => {
        console.log("hi");
        return delay(3000);
    })
    .then(() => {
        console.log("hello");
        return delay(5000);
    })
    .then(() => {
        console.log("hello there");
    });
```
✅ **Pros**: Avoids callback hell, improves readability.  
❌ **Cons**: Still somewhat chained, slightly less readable than async/await.  

---

### **3. Async/Await (Using a Promisified `setTimeout`)**
```javascript
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function logMessages() {
    await delay(1000);
    console.log("hi");

    await delay(3000);
    console.log("hello");

    await delay(5000);
    console.log("hello there");
}

logMessages();
```
✅ **Pros**:  
- Best readability (sequential execution style, like synchronous code).  
- Avoids callback hell and chaining issues.  
- Easier debugging and maintenance.  

❌ **Cons**:  
- Requires understanding of async/await, but modern JavaScript favors it.  

---

### **Which is the Best Approach?**
The **Async/Await** approach is the best because:  
- It is **easier to read** than both callback hell and promise chaining.  
- It **avoids deep nesting** (callback hell).  
- It allows **sequential execution** in an intuitive way.  

While promises are better than callback hell, they still introduce chaining complexity. Async/await simplifies this significantly, making it the preferred choice for handling asynchronous operations. 🚀