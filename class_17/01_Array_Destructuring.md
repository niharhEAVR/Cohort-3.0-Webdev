### **Array Destructuring**

Array destructuring is a feature in JavaScript that allows you to unpack values from arrays and assign them to individual variables in a concise syntax.

#### Syntax:
```javascript
const [variable1, variable2, variable3] = array;
```

- `variable1`, `variable2`, `variable3` will take the values from the corresponding positions in the `array`.

#### Example:
```javascript
const arr = [1, 2, 3];

// Using array destructuring
const [first, second, third] = arr;

console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3
```

- In the above example, the values `1`, `2`, and `3` from `arr` are assigned to `first`, `second`, and `third` respectively.

#### Skipping Elements:
You can skip elements in the array by leaving the position empty.
```javascript
const arr = [1, 2, 3, 4];

// Skip the second element
const [first, , third] = arr;

console.log(first); // 1
console.log(third); // 3
```

### **Summary of Key Differences**
- **Array Destructuring**: Used to unpack values from an array into separate variables.
  - You use square brackets (`[]`).
  - You can skip elements.

Destructuring feature make working with arrays and objects in JavaScript more concise and readable.