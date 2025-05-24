export const calculateCircle = {
  area: (radius: number) => Math.PI * radius * radius,
  circumference: (radius: number) => 2 * Math.PI * radius,
}

export const calculateEllipse = {
  area: (a: number, b: number) => Math.PI * a * b,
}

export const calculateSquare = {
  area: (side: number) => side * side,
  perimeter: (side: number) => 4 * side,
  diagonal: (side: number) => side * Math.sqrt(2),
}

export const calculateRectangle = {
  area: (length: number, width: number) => length * width,
  perimeter: (length: number, width: number) => 2 * (length + width),
  diagonal: (length: number, width: number) => Math.sqrt(length * length + width * width),
}

export const calculateTrapezium = {
  area: (a: number, b: number, height: number) => ((a + b) / 2) * height,
}

export const calculateParallelogram = {
  area: (side1: number, side2: number, angle: number) => side1 * side2 * Math.sin(angle * (Math.PI / 180)),
  perimeter: (side1: number, side2: number) => 2 * (side1 + side2),
}

export const calculateRhombus = {
  area: (diagonal1: number, diagonal2: number) => (diagonal1 * diagonal2) / 2,
  perimeter: (diagonal1: number, diagonal2: number) => 4 * Math.sqrt((diagonal1 * diagonal1 + diagonal2 * diagonal2) / 4),
  sideLength: (diagonal1: number, diagonal2: number) => 
    Math.sqrt((diagonal1 * diagonal1 + diagonal2 * diagonal2) / 4),
}

export const calculateRegularPolygon = {
  area: (side: number, n: number) => (n * side * side) / (4 * Math.tan(Math.PI / n)),
  perimeter: (side: number, n: number) => n * side,
  innerAngle: (n: number) => ((n - 2) * 180) / n,
  outerAngle: (n: number) => 360 / n,
}

export const calculateTriangle = {
  equilateral: {
    area: (side: number) => (Math.sqrt(3) / 4) * side * side,
    perimeter: (side: number) => 3 * side,
  },
  isosceles: {
    area: (base: number, height: number) => (base * height) / 2,
    perimeter: (base: number, equalSide: number) => base + 2 * equalSide,
  },
  scalene: {
    area: (a: number, b: number, c: number) => {
      const s = (a + b + c) / 2;
      return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    },
    perimeter: (a: number, b: number, c: number) => a + b + c,
  },
  right: {
    area: (base: number, height: number) => (base * height) / 2,
    perimeter: (base: number, height: number, hypotenuse: number) => base + height + hypotenuse,
    hypotenuse: (base: number, height: number) => Math.sqrt(base * base + height * height),
  },
}

export const calculate3D = {
  cube: {
    volume: (side: number) => side * side * side,
    surfaceArea: (side: number) => 6 * side * side,
    diagonal: (side: number) => side * Math.sqrt(3),
  },
  box: {
    volume: (length: number, width: number, height: number) => length * width * height,
    surfaceArea: (length: number, width: number, height: number) => 
      2 * (length * width + width * height + height * length),
    diagonal: (length: number, width: number, height: number) => 
      Math.sqrt(length * length + width * width + height * height),
  },
  sphere: {
    volume: (radius: number) => (4/3) * Math.PI * radius * radius * radius,
    surfaceArea: (radius: number) => 4 * Math.PI * radius * radius,
  },
  cylinder: {
    volume: (radius: number, height: number) => Math.PI * radius * radius * height,
    surfaceArea: (radius: number, height: number) => 
      2 * Math.PI * radius * height + 2 * Math.PI * radius * radius,
  },
  cone: {
    volume: (radius: number, height: number) => (1/3) * Math.PI * radius * radius * height,
    surfaceArea: (radius: number, height: number) => {
      const slantHeight = Math.sqrt(radius * radius + height * height);
      return Math.PI * radius * (radius + slantHeight);
    },
  },
  regularPrism: {
    volume: (side: number, n: number, height: number) => 
      calculateRegularPolygon.area(side, n) * height,
    surfaceArea: (side: number, n: number, height: number) => 
      2 * calculateRegularPolygon.area(side, n) + 
      calculateRegularPolygon.perimeter(side, n) * height,
  },
  regularPyramid: {
    volume: (side: number, n: number, height: number) => 
      calculateRegularPolygon.area(side, n) * height / 3,
  }
} 