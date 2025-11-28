# 🟦 **1. What is an Abstract Class?**

An **abstract class** is a class that **cannot be instantiated directly**.

It is used to:

* create a **base blueprint**
* force child classes to follow rules
* share **common logic** + **common properties**
* define **abstract methods** (methods without body)

### 👉 Abstract methods = “must be implemented by child classes”.

---

### ❌ You CANNOT do:

```ts
const a = new Animal(); // ❌ Error: Cannot create an instance of abstract class
```

### ✔️ You CAN extend it:

```ts
class Dog extends Animal { ... }
```

---

# 🟨 **2. Abstract Class Example (basic)**

```ts
abstract class Animal {
  abstract sound(): void; // must be implemented

  move() {
    console.log("Animal is moving");
  }
}

class Dog extends Animal {
  sound() {
    console.log("Woof!");
  }
}

const d = new Dog();
d.sound(); // Woof!
d.move();  // Animal is moving
```

---

# 🟩 **3. What is an Interface?**

An **interface**:

* defines **shape**
* has **no implementation**
* can only have **method signatures** + **property types**

Example:

```ts
interface CanRun {
  speed: number;
  run(): void;
}
```

---

# 🟧 **4. Using Abstract Class + Interface Together**

You can do **BOTH**:

✔️ A class can **extend** an abstract class
✔️ And also **implement** one or more interfaces

This is how real-world OOP works.

---

# 🟦 **5. Example: Abstract Class + Interface Together**

Let’s build something meaningful.

### 🟡 Step 1: Create Interface

```ts
interface CanFly {
  wings: number;
  fly(): void;
}
```

### 🟠 Step 2: Create Abstract Class

```ts
abstract class Animal {
  constructor(public name: string) {}

  abstract makeSound(): void;

  eat() {
    console.log(`${this.name} is eating`);
  }
}
```

### 🟢 Step 3: Create Child Class

Here we use **extends** + **implements** together:

```ts
class Bird extends Animal implements CanFly {
  wings = 2;

  makeSound() {
    console.log("Chirp chirp");
  }

  fly() {
    console.log(`${this.name} is flying`);
  }
}
```

### 🟣 Step 4: Use it

```ts
const parrot = new Bird("Parrot");

parrot.makeSound(); // Chirp chirp
parrot.eat();       // Parrot is eating
parrot.fly();       // Parrot is flying
```

---

# 🧠 **6. Why Use Both Together?**

| Feature                      | Abstract Class            | Interface                    |
| ---------------------------- | ------------------------- | ---------------------------- |
| Can have implementation      | ✔️ Yes                    | ❌ No                         |
| Constructor                  | ✔️ Yes                    | ❌ No                         |
| Multiple inheritance         | ❌ No (only 1 class)       | ✔️ Yes (multiple interfaces) |
| Forces children to implement | ✔️ Yes (abstract methods) | ✔️ Yes                       |

Using **both together** gives you:

* **shared logic** (from abstract class)
* **rules/structure** (from interfaces)
* **flexibility** (multiple interfaces)

This is the most powerful combination.

---

# 🟦 Complete Real-Life Example: Payment System

### Interface

```ts
interface Payable {
  pay(amount: number): void;
}
```

### Abstract Class

```ts
abstract class PaymentGateway {
  abstract connect(): void;

  log(message: string) {
    console.log("LOG:", message);
  }
}
```

### Concrete Class

```ts
class Stripe extends PaymentGateway implements Payable {
  connect() {
    this.log("Connected to Stripe");
  }

  pay(amount: number) {
    console.log(`Paid ₹${amount} using Stripe`);
  }
}
```

### Usage

```ts
const s = new Stripe();
s.connect();
s.pay(500);
```

---

# 🎉 **Summary**

### ✔️ **Abstract class** → blueprint + shared logic

### ✔️ **Interface** → structure without implementation

### ✔️ **A class can extend abstract class AND implement interfaces**

### ✔️ Best practice for large, structured apps



---
---
---



# ✅ **Final Relationship Between Abstract Class & Interface in TypeScript**

### **1. What They Are**

| Feature            | Abstract Class                                          | Interface                                           |
| ------------------ | ------------------------------------------------------- | --------------------------------------------------- |
| Purpose            | Provide base/partial implementation                     | Provide structure/contract only                     |
| Contains           | Properties, abstract methods, *and* implemented methods | Only method/property signatures (no implementation) |
| Instantiation      | ❌ Cannot be instantiated                                | ❌ Cannot be instantiated                            |
| Extend / Implement | A class **extends** an abstract class                   | A class **implements** an interface                 |

---

# ✅ **Core Relationship**

### **➡ A class can:**

✔ **Extend ONE abstract class**
✔ **Implement MULTIPLE interfaces**

### **This gives the power of:**

* Inheriting shared logic → from abstract class
* Enforcing contracts → from interfaces

---

# ⚡ **The Final Takeaway**

### **👉 Abstract class = “WHAT + SOME HOW”**

It defines **what** must exist + **some partial implementation**.

### **👉 Interface = “WHAT ONLY”**

It defines **only what should exist**, no implementation.

### **👉 They work together to build powerful type-safe OOP structures.**

---

# ✅ Example Showing Final Relationship

```ts
// -------- INTERFACES (contract only) --------
interface CanDrive {
  drive(): void;
}

interface HasWheels {
  wheelCount: number;
}

// -------- ABSTRACT CLASS (shared logic + abstract methods) --------
abstract class Vehicle {
  constructor(public brand: string) {}

  // Abstract method (must be implemented)
  abstract start(): void;

  // Normal method (shared logic)
  stop() {
    console.log(`${this.brand} stopped`);
  }
}

// -------- CLASS USING BOTH --------
class Car extends Vehicle implements CanDrive, HasWheels {
  wheelCount = 4;

  start() {
    console.log(`${this.brand} engine started`);
  }

  drive() {
    console.log(`${this.brand} is driving`);
  }
}
```

### **Final Behavior**

* `Vehicle` gives:

  * Common logic (`stop()`)
  * Required logic (`start()` must be overridden)

* Interfaces give:

  * Extra required structure (`drive()`, `wheelCount`)

* `Car` gets:
  ✔ Inheritance
  ✔ Multiple-interface implementation
  ✔ Polymorphism
  ✔ Strong typing

---

# 🎯 **Final Summary in One Line**

**Abstract classes share logic + enforce rules, while interfaces enforce rules only — and TypeScript lets a class combine both for maximum flexibility.**
