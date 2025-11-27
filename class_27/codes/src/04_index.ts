interface Vehicle {
  brand: string;
  speed: number;
  drive(): void;
}

class Car implements Vehicle {
  constructor(public brand: string, public speed: number) {}

  drive() {
    console.log(`${this.brand} driving...`);
  }
}

class Bike implements Vehicle {
  constructor(public brand: string, public speed: number) {}

  drive() {
    console.log(`${this.brand} riding...`);
  }
}


function start(v: Vehicle) {
  v.drive(); // Works for both Car and Bike
}

start(new Car("BMW", 200));
start(new Bike("Yamaha", 150));
