"use client"

import { Button } from "@/components/ui/button"
import { Shape, CalculationResult } from "@/types/geometry"
import { useState } from "react"
import * as calculations from "@/lib/geometry-calculations"

interface CalculationFormProps {
  shape: Shape;
  onBack: () => void;
  onCalculate: (results: { [key: string]: CalculationResult }) => void;
}

export function CalculationForm({ shape, onBack, onCalculate }: CalculationFormProps) {
  const [inputs, setInputs] = useState<{ [key: string]: { [key: string]: string } }>({})
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (calc: string, inputKey: string, value: string) => {
    setInputs(prev => {
      const newInputs = { ...prev }
      
      // Update the current input
      newInputs[calc] = {
        ...newInputs[calc],
        [inputKey]: value
      }

      // Find other calculations that have the same input label
      shape.calculations.forEach(otherCalc => {
        if (otherCalc !== calc) {
          const matchingInput = shape.requiredInputs[otherCalc].find(
            input => input.label === inputKey
          )
          
          // If the input exists in another calculation and is currently empty,
          // copy the value
          if (matchingInput && (!newInputs[otherCalc]?.[inputKey] || newInputs[otherCalc][inputKey] === "")) {
            newInputs[otherCalc] = {
              ...newInputs[otherCalc],
              [inputKey]: value
            }
          }
        }
      })

      return newInputs
    })
  }

  const handleCalculate = () => {
    try {
      setIsLoading(true)
      const results: { [key: string]: CalculationResult } = {}
      
      // Validate all inputs are numbers
      for (const [calc, calcInputs] of Object.entries(inputs)) {
        const values = Object.values(calcInputs).map(Number)
        if (values.some(isNaN)) {
          throw new Error("Please enter valid numbers for all inputs")
        }
        if (values.some(v => v <= 0)) {
          throw new Error("All measurements must be greater than 0")
        }
      }

      // Perform calculations based on shape and calculation type
      for (const calc of shape.calculations) {
        const currentInputs = inputs[calc] || {}
        const values = Object.values(currentInputs).map(Number)

        switch (shape.name) {
          case "Circle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateCircle.area(values[0]),
                unit: "square units"
              }
            } else if (calc === "Circumference") {
              results["Circumference"] = {
                value: calculations.calculateCircle.circumference(values[0]),
                unit: "units"
              }
            }
            break;

          case "Ellipse":
            results["Area"] = {
              value: calculations.calculateEllipse.area(values[0], values[1]),
              unit: "square units"
            }
            break;

          case "Square":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateSquare.area(values[0]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateSquare.perimeter(values[0]),
                unit: "units"
              }
            } else if (calc === "Diagonal") {
              results["Diagonal"] = {
                value: calculations.calculateSquare.diagonal(values[0]),
                unit: "units"
              }
            }
            break;

          case "Rectangle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateRectangle.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateRectangle.perimeter(values[0], values[1]),
                unit: "units"
              }
            } else if (calc === "Diagonal") {
              results["Diagonal"] = {
                value: calculations.calculateRectangle.diagonal(values[0], values[1]),
                unit: "units"
              }
            }
            break;

          case "Trapezium":
            results["Area"] = {
              value: calculations.calculateTrapezium.area(values[0], values[1], values[2]),
              unit: "square units"
            }
            break;

          case "Parallelogram":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateParallelogram.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateParallelogram.perimeter(values[0], values[1]),
                unit: "units"
              }
            }
            break;

          case "Rhombus":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateRhombus.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateRhombus.perimeter(values[0]),
                unit: "units"
              }
            } else if (calc === "Side Length") {
              results["Side Length"] = {
                value: calculations.calculateRhombus.sideLength(values[0], values[1]),
                unit: "units"
              }
            }
            break;

          case "Regular Polygon":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateRegularPolygon.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateRegularPolygon.perimeter(values[0], values[1]),
                unit: "units"
              }
            } else if (calc === "Inner/Outer Angles") {
              results["Inner Angle"] = {
                value: calculations.calculateRegularPolygon.innerAngle(values[0]),
                unit: "degrees"
              }
              results["Outer Angle"] = {
                value: calculations.calculateRegularPolygon.outerAngle(values[0]),
                unit: "degrees"
              }
            }
            break;

          case "Equilateral Triangle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateTriangle.equilateral.area(values[0]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateTriangle.equilateral.perimeter(values[0]),
                unit: "units"
              }
            }
            break;

          case "Isosceles Triangle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateTriangle.isosceles.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateTriangle.isosceles.perimeter(values[0], values[1]),
                unit: "units"
              }
            }
            break;

          case "Scalene Triangle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateTriangle.scalene.area(values[0], values[1], values[2]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateTriangle.scalene.perimeter(values[0], values[1], values[2]),
                unit: "units"
              }
            }
            break;

          case "Right Triangle":
            if (calc === "Area") {
              results["Area"] = {
                value: calculations.calculateTriangle.right.area(values[0], values[1]),
                unit: "square units"
              }
            } else if (calc === "Perimeter") {
              results["Perimeter"] = {
                value: calculations.calculateTriangle.right.perimeter(values[0], values[1], values[2]),
                unit: "units"
              }
            } else if (calc === "Hypotenuse") {
              results["Hypotenuse"] = {
                value: calculations.calculateTriangle.right.hypotenuse(values[0], values[1]),
                unit: "units"
              }
            }
            break;

          // 3D Shapes
          case "Cube":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.cube.volume(values[0]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.cube.surfaceArea(values[0]),
                unit: "square units"
              }
            } else if (calc === "Diagonal") {
              results["Diagonal"] = {
                value: calculations.calculate3D.cube.diagonal(values[0]),
                unit: "units"
              }
            }
            break;

          case "Box":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.box.volume(values[0], values[1], values[2]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.box.surfaceArea(values[0], values[1], values[2]),
                unit: "square units"
              }
            } else if (calc === "Diagonal") {
              results["Diagonal"] = {
                value: calculations.calculate3D.box.diagonal(values[0], values[1], values[2]),
                unit: "units"
              }
            }
            break;

          case "Sphere":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.sphere.volume(values[0]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.sphere.surfaceArea(values[0]),
                unit: "square units"
              }
            }
            break;

          case "Cylinder":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.cylinder.volume(values[0], values[1]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.cylinder.surfaceArea(values[0], values[1]),
                unit: "square units"
              }
            }
            break;

          case "Cone":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.cone.volume(values[0], values[1]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.cone.surfaceArea(values[0], values[1]),
                unit: "square units"
              }
            }
            break;

          case "Regular Prism":
            if (calc === "Volume") {
              results["Volume"] = {
                value: calculations.calculate3D.regularPrism.volume(values[0], values[1]),
                unit: "cubic units"
              }
            } else if (calc === "Surface Area") {
              results["Surface Area"] = {
                value: calculations.calculate3D.regularPrism.surfaceArea(values[0], values[1]),
                unit: "square units"
              }
            }
            break;

          case "Regular Pyramid":
            results["Volume"] = {
              value: calculations.calculate3D.regularPyramid.volume(values[0], values[1]),
              unit: "cubic units"
            }
            break;
        }
      }

      onCalculate(results)
      setError("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate()
    } else if (e.key === "Escape") {
      onBack()
    } else if (e.key === "c") {
      setInputs({})
      setError("")
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6" onKeyDown={handleKeyPress}>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{shape.name}</h2>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
      
      <div className="space-y-4">
        {shape.calculations.map(calc => (
          <div key={calc} className="space-y-2">
            <h3 className="text-lg font-medium">{calc}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {shape.requiredInputs[calc].map(input => (
                <div key={input.label} className="space-y-1">
                  <label className="block text-sm font-medium">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={input.placeholder}
                    value={inputs[calc]?.[input.label] || ""}
                    onChange={(e) => handleInputChange(calc, input.label, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={handleCalculate} disabled={isLoading}>
          {isLoading ? "Calculating..." : "Calculate"}
        </Button>
        <Button variant="outline" onClick={() => {
          setInputs({})
          setError("")
        }}>
          Clear
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Keyboard shortcuts:</p>
        <ul className="list-disc list-inside">
          <li>Enter: Calculate</li>
          <li>ESC: Go back</li>
          <li>C: Clear inputs</li>
        </ul>
      </div>
    </div>
  )
} 