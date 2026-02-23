class Visitor {
  visitCircle() {}
  visitRectangle() {}
}

class AreaVisitor extends Visitor {
  visitCircle(circle) {
    const area = Math.PI * Math.pow(circle.radius, 2);
    console.log(`Circle area: ${area}`);
  }
  visitRectangle(rectangle) {
    const area = rectangle.width * rectangle.height;
    console.log(`Rectangle area: ${area}`);
  }
}

class PerimeterVisitor extends Visitor {
  visitCircle(circle) {
    const perimeter = 2 * Math.PI * circle.radius;
    console.log(`Circle perimeter: ${perimeter}`);
  }
  visitRectangle(rectangle) {
    const perimeter = 2 * (rectangle.width + rectangle.height);
    console.log(`Rectangle perimeter: ${perimeter}`);
  }
}

class Shape {
  accept(visitor) {}
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  accept(visitor) {
    visitor.visitCircle(this);
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  accept(visitor) {
    return visitor.visitRectangle(this);
  }
}

const shapes = [new Circle(5), new Rectangle(4, 6)];

const areaVisitor = new AreaVisitor();
const perimeterVisitor = new PerimeterVisitor();

shapes.forEach((shape) => shape.accept(areaVisitor));
shapes.forEach((shape) => shape.accept(perimeterVisitor));
