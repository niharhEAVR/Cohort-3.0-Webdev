class Rectangle {
  constructor(width, height, color) {
    this.width = width;
    this.height = height;
    this.color = color;
  }

  area() {
    const area = this.width * this.height;
    return area;
  }

  paint() {
    console.log(`Painting with color ${this.color}`);
  }

  printing_this () {
    console.log(this)
    // so the ('this') is a keyword in class and its prints the object that has been created 
  }

}

const rect = new Rectangle(2, 4, "blue")
//on the upline, there is a new object is forming using the three argument values, and later we can use it,  and because of the ('new') keyword the values get to initialize inside the constructor

rect.paint()
console.log(`the area of the rectangle is ${rect.area()}`)
rect.printing_this()