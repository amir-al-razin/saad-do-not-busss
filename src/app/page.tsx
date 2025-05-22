"use client"

import { useState } from "react"
import { Shape, CalculationResult } from "@/types/geometry"
import { ShapeSelector } from "@/components/geometry/ShapeSelector"
import { CalculationForm } from "@/components/geometry/CalculationForm"
import { Results } from "@/components/geometry/Results"

const shapes: Shape[] = [
  // 2D Shapes
  {
    name: "Circle",
    category: "2D",
    calculations: ["Area", "Circumference"],
    requiredInputs: {
      "Area": [{ label: "Radius", type: "number", placeholder: "Enter radius" }],
      "Circumference": [{ label: "Radius", type: "number", placeholder: "Enter radius" }]
    }
  },
  {
    name: "Ellipse",
    category: "2D",
    calculations: ["Area"],
    requiredInputs: {
      "Area": [
        { label: "Semi-major axis (a)", type: "number", placeholder: "Enter a" },
        { label: "Semi-minor axis (b)", type: "number", placeholder: "Enter b" }
      ]
    }
  },
  {
    name: "Square",
    category: "2D",
    calculations: ["Area", "Perimeter", "Diagonal"],
    requiredInputs: {
      "Area": [{ label: "Side length", type: "number", placeholder: "Enter side length" }],
      "Perimeter": [{ label: "Side length", type: "number", placeholder: "Enter side length" }],
      "Diagonal": [{ label: "Side length", type: "number", placeholder: "Enter side length" }]
    }
  },
  {
    name: "Rectangle",
    category: "2D",
    calculations: ["Area", "Perimeter", "Diagonal"],
    requiredInputs: {
      "Area": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" }
      ],
      "Perimeter": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" }
      ],
      "Diagonal": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" }
      ]
    }
  },
  {
    name: "Trapezium",
    category: "2D",
    calculations: ["Area"],
    requiredInputs: {
      "Area": [
        { label: "Base 1", type: "number", placeholder: "Enter first base" },
        { label: "Base 2", type: "number", placeholder: "Enter second base" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  },
  {
    name: "Parallelogram",
    category: "2D",
    calculations: ["Area", "Perimeter"],
    requiredInputs: {
      "Area": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Perimeter": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Side", type: "number", placeholder: "Enter side length" }
      ]
    }
  },
  {
    name: "Rhombus",
    category: "2D",
    calculations: ["Area", "Perimeter", "Side Length"],
    requiredInputs: {
      "Area": [
        { label: "Diagonal 1", type: "number", placeholder: "Enter first diagonal" },
        { label: "Diagonal 2", type: "number", placeholder: "Enter second diagonal" }
      ],
      "Perimeter": [{ label: "Side", type: "number", placeholder: "Enter side length" }],
      "Side Length": [
        { label: "Diagonal 1", type: "number", placeholder: "Enter first diagonal" },
        { label: "Diagonal 2", type: "number", placeholder: "Enter second diagonal" }
      ]
    }
  },
  {
    name: "Regular Polygon",
    category: "2D",
    calculations: ["Area", "Perimeter", "Inner/Outer Angles"],
    requiredInputs: {
      "Area": [
        { label: "Side length", type: "number", placeholder: "Enter side length" },
        { label: "Number of sides", type: "number", placeholder: "Enter number of sides" }
      ],
      "Perimeter": [
        { label: "Side length", type: "number", placeholder: "Enter side length" },
        { label: "Number of sides", type: "number", placeholder: "Enter number of sides" }
      ],
      "Inner/Outer Angles": [{ label: "Number of sides", type: "number", placeholder: "Enter number of sides" }]
    }
  },
  {
    name: "Equilateral Triangle",
    category: "2D",
    calculations: ["Area", "Perimeter"],
    requiredInputs: {
      "Area": [{ label: "Side length", type: "number", placeholder: "Enter side length" }],
      "Perimeter": [{ label: "Side length", type: "number", placeholder: "Enter side length" }]
    }
  },
  {
    name: "Isosceles Triangle",
    category: "2D",
    calculations: ["Area", "Perimeter"],
    requiredInputs: {
      "Area": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Perimeter": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Equal side", type: "number", placeholder: "Enter equal side length" }
      ]
    }
  },
  {
    name: "Scalene Triangle",
    category: "2D",
    calculations: ["Area", "Perimeter"],
    requiredInputs: {
      "Area": [
        { label: "Side a", type: "number", placeholder: "Enter first side" },
        { label: "Side b", type: "number", placeholder: "Enter second side" },
        { label: "Side c", type: "number", placeholder: "Enter third side" }
      ],
      "Perimeter": [
        { label: "Side a", type: "number", placeholder: "Enter first side" },
        { label: "Side b", type: "number", placeholder: "Enter second side" },
        { label: "Side c", type: "number", placeholder: "Enter third side" }
      ]
    }
  },
  {
    name: "Right Triangle",
    category: "2D",
    calculations: ["Area", "Perimeter", "Hypotenuse"],
    requiredInputs: {
      "Area": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Perimeter": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Height", type: "number", placeholder: "Enter height" },
        { label: "Hypotenuse", type: "number", placeholder: "Enter hypotenuse" }
      ],
      "Hypotenuse": [
        { label: "Base", type: "number", placeholder: "Enter base" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  },
  
  // 3D Shapes
  {
    name: "Cube",
    category: "3D",
    calculations: ["Volume", "Surface Area", "Diagonal"],
    requiredInputs: {
      "Volume": [{ label: "Side length", type: "number", placeholder: "Enter side length" }],
      "Surface Area": [{ label: "Side length", type: "number", placeholder: "Enter side length" }],
      "Diagonal": [{ label: "Side length", type: "number", placeholder: "Enter side length" }]
    }
  },
  {
    name: "Box",
    category: "3D",
    calculations: ["Volume", "Surface Area", "Diagonal"],
    requiredInputs: {
      "Volume": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Surface Area": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Diagonal": [
        { label: "Length", type: "number", placeholder: "Enter length" },
        { label: "Width", type: "number", placeholder: "Enter width" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  },
  {
    name: "Sphere",
    category: "3D",
    calculations: ["Volume", "Surface Area"],
    requiredInputs: {
      "Volume": [{ label: "Radius", type: "number", placeholder: "Enter radius" }],
      "Surface Area": [{ label: "Radius", type: "number", placeholder: "Enter radius" }]
    }
  },
  {
    name: "Cylinder",
    category: "3D",
    calculations: ["Volume", "Surface Area"],
    requiredInputs: {
      "Volume": [
        { label: "Radius", type: "number", placeholder: "Enter radius" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Surface Area": [
        { label: "Radius", type: "number", placeholder: "Enter radius" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  },
  {
    name: "Cone",
    category: "3D",
    calculations: ["Volume", "Surface Area"],
    requiredInputs: {
      "Volume": [
        { label: "Radius", type: "number", placeholder: "Enter radius" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Surface Area": [
        { label: "Radius", type: "number", placeholder: "Enter radius" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  },
  {
    name: "Regular Prism",
    category: "3D",
    calculations: ["Volume", "Surface Area"],
    requiredInputs: {
      "Volume": [
        { label: "Base area", type: "number", placeholder: "Enter base area" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ],
      "Surface Area": [
        { label: "Base area", type: "number", placeholder: "Enter base area" },
        { label: "Lateral area", type: "number", placeholder: "Enter lateral area" }
      ]
    }
  },
  {
    name: "Regular Pyramid",
    category: "3D",
    calculations: ["Volume"],
    requiredInputs: {
      "Volume": [
        { label: "Base area", type: "number", placeholder: "Enter base area" },
        { label: "Height", type: "number", placeholder: "Enter height" }
      ]
    }
  }
]

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<Shape | null>(null)
  const [results, setResults] = useState<{ [key: string]: CalculationResult }>({})

  const handleShapeSelect = (shape: Shape) => {
    setSelectedShape(shape)
    setResults({})
  }

  const handleCalculate = (newResults: { [key: string]: CalculationResult }) => {
    setResults(newResults)
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Geometry Calculator</h1>
      
      {!selectedShape ? (
        <ShapeSelector shapes={shapes} onSelect={handleShapeSelect} />
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <CalculationForm
              shape={selectedShape}
              onBack={() => setSelectedShape(null)}
              onCalculate={handleCalculate}
            />
            <div className="max-w-2xl mx-auto mt-8">
              <Results results={results} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
