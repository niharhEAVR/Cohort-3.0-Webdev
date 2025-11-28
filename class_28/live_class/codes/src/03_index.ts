type A = { name: string, hola: string };
type B = { age: number, hola: string };

type C = A | B; // either A's or(|) B's properties will be there
type D = A & B; // both A's and(&) B's properties will be there
let p: C = { name: "Raj", age: 19, hola:"hello" };

// console.log(p.name); // Property 'name' does not exist on type 'C'.
// Property 'name' does not exist on type 'B'.

// console.log(p.age); // Property 'age' does not exist on type 'C'.
// Property 'age' does not exist on type 'A'.


console.log(p.hola); // This is fine because both A and B have 'hola' property
