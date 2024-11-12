### **Object Destructuring**

Object destructuring is a similar concept that allows you to unpack properties from an object and assign them to variables in a concise syntax.

#### Syntax:
```javascript
const { property1, property2, property3 } = object;
```

- `property1`, `property2`, `property3` are the keys of the object, and their corresponding values will be assigned to the variables.

#### Example:
```javascript
const person = {
  name: "John",
  age: 30,
  job: "developer",
};

// Using object destructuring
const { name, age, job } = person;

console.log(name); // John
console.log(age);  // 30
console.log(job);  // developer
```

- In the above example, the `name`, `age`, and `job` properties from the `person` object are assigned to the variables `name`, `age`, and `job`.

#### Renaming Variables:
You can rename the destructured variables.
```javascript
const person = {
  name: "John",
  age: 30,
};

// Renaming the variables during destructuring
const { name: fullName, age: yearsOld } = person;

console.log(fullName); // John
console.log(yearsOld); // 30
```

- Here, `name` is renamed to `fullName`, and `age` is renamed to `yearsOld`.

#### Default Values:
You can also assign default values in case the property doesn’t exist in the object.
```javascript
const person = {
  name: "John",
};

// Assign default value to age if it’s not present in the object
const { name, age = 25 } = person;

console.log(name); // John
console.log(age);  // 25 (default value)
```

### **Summary of Key Differences**
- **Object Destructuring**: Used to unpack properties from an object into separate variables.
  - You use curly braces (`{}`).
  - You can rename variables and provide default values.

Destructuring feature make working with arrays and objects in JavaScript more concise and readable.