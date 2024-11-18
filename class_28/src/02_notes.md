In TypeScript, **abstract classes** and **interfaces** are both used to define abstract types, but they serve different purposes and have distinct features. Here's a comparison to help you understand the differences:

---

### **1. Purpose**
| Feature               | Abstract Class                                           | Interface                                                |
|-----------------------|---------------------------------------------------------|---------------------------------------------------------|
| **Use**              | Used as a base class to provide a common structure and behavior for derived classes. | Defines a contract that a class must adhere to without providing any implementation. |

---

### **2. Implementation**
| Feature               | Abstract Class                                           | Interface                                                |
|-----------------------|---------------------------------------------------------|---------------------------------------------------------|
| **Implementation Allowed** | Can contain both implemented (concrete) methods and abstract methods (without implementation). | Cannot have implementations; it only specifies method signatures and properties. |
| **Constructors**      | Can have a constructor.                                 | Cannot have a constructor.                             |

---

### **3. Inheritance**
| Feature               | Abstract Class                                           | Interface                                                |
|-----------------------|---------------------------------------------------------|---------------------------------------------------------|
| **Single vs. Multiple** | A class can extend only one abstract class (single inheritance). | A class can implement multiple interfaces.              |

---

### **4. Properties**
| Feature               | Abstract Class                                           | Interface                                                |
|-----------------------|---------------------------------------------------------|---------------------------------------------------------|
| **Fields**            | Can define and initialize fields (variables).           | Cannot have fields or initialize them.                 |
| **Modifiers**         | Can use access modifiers (e.g., `public`, `private`, `protected`). | All members are `public` by default. Access modifiers are not allowed. |

---

### **5. Type Compatibility**
| Feature               | Abstract Class                                           | Interface                                                |
|-----------------------|---------------------------------------------------------|---------------------------------------------------------|
| **Use as Type**       | Cannot be used to define a type for variables or function parameters. | Can be used as a type to enforce a structure for variables or function parameters. |

---

### **6. Example**
#### **Abstract Class Example**
```typescript
abstract class Animal {
  abstract makeSound(): void; // Abstract method

  move(): void {             // Concrete method
    console.log("Moving...");
  }
}

class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.makeSound(); // Output: Woof!
dog.move();      // Output: Moving...
```

#### **Interface Example**
```typescript
interface Vehicle {
  wheels: number;
  drive(): void;
}

class Car implements Vehicle {
  wheels: number = 4;

  drive(): void {
    console.log("Driving...");
  }
}

const car: Vehicle = new Car();
car.drive(); // Output: Driving...
```

---

### **When to Use**
- **Abstract Class**: Use when you want to provide some default implementation or when classes need to share behavior in addition to structure.
- **Interface**: Use when you only need to enforce a contract without providing any implementation, especially when multiple contracts need to be implemented.

Both can be used in combination to create a powerful design, such as an interface to define a contract and an abstract class to provide partial implementation of it.