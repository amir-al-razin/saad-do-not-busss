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
  const [inputs, setInputs] = useState<{ [key: string]: string }>({})
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  // Get unique inputs across all calculations
  const uniqueInputs = Array.from(new Set(
    shape.calculations.flatMap(calc => 
      shape.requiredInputs[calc].map(input => input.label)
    )
  )).map(label => {
    const firstCalc = shape.calculations.find(calc => 
      shape.requiredInputs[calc].some(input => input.label === label)
    )
    const input = shape.requiredInputs[firstCalc!].find(input => input.label === label)!
    return { label, type: input.type, placeholder: input.placeholder }
  })

  const handleInputChange = (label: string, value: string) => {
    setInputs(prev => ({
      ...prev,
      [label]: value
    }))
  }

  const handleCalculate = () => {
    try {
      setIsLoading(true)
      const results: { [key: string]: CalculationResult } = {}
      
      // Validate all inputs are numbers
      const values = Object.values(inputs).map(Number)
      if (values.some(isNaN)) {
        throw new Error("Please enter valid numbers for all inputs")
      }
      if (values.some(v => v <= 0)) {
        throw new Error("All measurements must be greater than 0")
      }

      // Perform all calculations for the shape
      switch (shape.name) {
        case "Circle":
          const radius = Number(inputs["Radius"])
          results["Area"] = {
            value: calculations.calculateCircle.area(radius),
            unit: "square units"
          }
          results["Circumference"] = {
            value: calculations.calculateCircle.circumference(radius),
            unit: "units"
          }
          break

        case "Ellipse":
          const a = Number(inputs["Semi-major axis (a)"])
          const b = Number(inputs["Semi-minor axis (b)"])
          results["Area"] = {
            value: calculations.calculateEllipse.area(a, b),
            unit: "square units"
          }
          break

        case "Square":
          const squareSide = Number(inputs["Side length"])
          results["Area"] = {
            value: calculations.calculateSquare.area(squareSide),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateSquare.perimeter(squareSide),
            unit: "units"
          }
          results["Diagonal"] = {
            value: calculations.calculateSquare.diagonal(squareSide),
            unit: "units"
          }
          break

        case "Rectangle":
          const rectLength = Number(inputs["Length"])
          const rectWidth = Number(inputs["Width"])
          results["Area"] = {
            value: calculations.calculateRectangle.area(rectLength, rectWidth),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateRectangle.perimeter(rectLength, rectWidth),
            unit: "units"
          }
          results["Diagonal"] = {
            value: calculations.calculateRectangle.diagonal(rectLength, rectWidth),
            unit: "units"
          }
          break

        case "Trapezium":
          const trapBase1 = Number(inputs["Base 1"])
          const trapBase2 = Number(inputs["Base 2"])
          const trapHeight = Number(inputs["Height"])
          results["Area"] = {
            value: calculations.calculateTrapezium.area(trapBase1, trapBase2, trapHeight),
            unit: "square units"
          }
          break

        case "Parallelogram":
          const paraBase = Number(inputs["Base"])
          const paraSide = Number(inputs["Side"])
          const paraHeight = Number(inputs["Height"])
          results["Area"] = {
            value: calculations.calculateParallelogram.area(paraBase, paraHeight),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateParallelogram.perimeter(paraBase, paraSide),
            unit: "units"
          }
          break

        case "Rhombus":
          const rhombusD1 = Number(inputs["Diagonal 1"])
          const rhombusD2 = Number(inputs["Diagonal 2"])
          results["Area"] = {
            value: calculations.calculateRhombus.area(rhombusD1, rhombusD2),
            unit: "square units"
          }
          results["Side Length"] = {
            value: calculations.calculateRhombus.sideLength(rhombusD1, rhombusD2),
            unit: "units"
          }
          results["Perimeter"] = {
            value: calculations.calculateRhombus.perimeter(results["Side Length"].value),
            unit: "units"
          }
          break

        case "Regular Polygon":
          const polySide = Number(inputs["Side length"])
          const polySides = Number(inputs["Number of sides"])
          results["Area"] = {
            value: calculations.calculateRegularPolygon.area(polySide, polySides),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateRegularPolygon.perimeter(polySide, polySides),
            unit: "units"
          }
          results["Inner Angle"] = {
            value: calculations.calculateRegularPolygon.innerAngle(polySides),
            unit: "degrees"
          }
          results["Outer Angle"] = {
            value: calculations.calculateRegularPolygon.outerAngle(polySides),
            unit: "degrees"
          }
          break

        case "Equilateral Triangle":
          const eqSide = Number(inputs["Side length"])
          results["Area"] = {
            value: calculations.calculateTriangle.equilateral.area(eqSide),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateTriangle.equilateral.perimeter(eqSide),
            unit: "units"
          }
          break

        case "Isosceles Triangle":
          const isoBase = Number(inputs["Base"])
          const isoHeight = Number(inputs["Height"])
          const isoEqualSide = Number(inputs["Equal side"])
          results["Area"] = {
            value: calculations.calculateTriangle.isosceles.area(isoBase, isoHeight),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateTriangle.isosceles.perimeter(isoBase, isoEqualSide),
            unit: "units"
          }
          break

        case "Scalene Triangle":
          const scaleneA = Number(inputs["Side a"])
          const scaleneB = Number(inputs["Side b"])
          const scaleneC = Number(inputs["Side c"])
          results["Area"] = {
            value: calculations.calculateTriangle.scalene.area(scaleneA, scaleneB, scaleneC),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateTriangle.scalene.perimeter(scaleneA, scaleneB, scaleneC),
            unit: "units"
          }
          break

        case "Right Triangle":
          const rightBase = Number(inputs["Base"])
          const rightHeight = Number(inputs["Height"])
          const rightHypotenuse = calculations.calculateTriangle.right.hypotenuse(rightBase, rightHeight)
          results["Area"] = {
            value: calculations.calculateTriangle.right.area(rightBase, rightHeight),
            unit: "square units"
          }
          results["Perimeter"] = {
            value: calculations.calculateTriangle.right.perimeter(rightBase, rightHeight, rightHypotenuse),
            unit: "units"
          }
          results["Hypotenuse"] = {
            value: rightHypotenuse,
            unit: "units"
          }
          break

        // 3D Shapes
        case "Cube":
          const cubeSide = Number(inputs["Side length"])
          results["Volume"] = {
            value: calculations.calculate3D.cube.volume(cubeSide),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.cube.surfaceArea(cubeSide),
            unit: "square units"
          }
          results["Diagonal"] = {
            value: calculations.calculate3D.cube.diagonal(cubeSide),
            unit: "units"
          }
          break

        case "Box":
          const boxLength = Number(inputs["Length"])
          const boxWidth = Number(inputs["Width"])
          const boxHeight = Number(inputs["Height"])
          results["Volume"] = {
            value: calculations.calculate3D.box.volume(boxLength, boxWidth, boxHeight),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.box.surfaceArea(boxLength, boxWidth, boxHeight),
            unit: "square units"
          }
          results["Diagonal"] = {
            value: calculations.calculate3D.box.diagonal(boxLength, boxWidth, boxHeight),
            unit: "units"
          }
          break

        case "Sphere":
          const sphereRadius = Number(inputs["Radius"])
          results["Volume"] = {
            value: calculations.calculate3D.sphere.volume(sphereRadius),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.sphere.surfaceArea(sphereRadius),
            unit: "square units"
          }
          break

        case "Cylinder":
          const cylinderRadius = Number(inputs["Radius"])
          const cylinderHeight = Number(inputs["Height"])
          results["Volume"] = {
            value: calculations.calculate3D.cylinder.volume(cylinderRadius, cylinderHeight),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.cylinder.surfaceArea(cylinderRadius, cylinderHeight),
            unit: "square units"
          }
          break

        case "Cone":
          const coneRadius = Number(inputs["Radius"])
          const coneHeight = Number(inputs["Height"])
          results["Volume"] = {
            value: calculations.calculate3D.cone.volume(coneRadius, coneHeight),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.cone.surfaceArea(coneRadius, coneHeight),
            unit: "square units"
          }
          break

        case "Regular Prism":
          const prismBaseArea = Number(inputs["Base area"])
          const prismHeight = Number(inputs["Height"])
          const prismLateralArea = Number(inputs["Lateral area"])
          results["Volume"] = {
            value: calculations.calculate3D.regularPrism.volume(prismBaseArea, prismHeight),
            unit: "cubic units"
          }
          results["Surface Area"] = {
            value: calculations.calculate3D.regularPrism.surfaceArea(prismBaseArea, prismLateralArea),
            unit: "square units"
          }
          break

        case "Regular Pyramid":
          const pyramidBaseArea = Number(inputs["Base area"])
          const pyramidHeight = Number(inputs["Height"])
          results["Volume"] = {
            value: calculations.calculate3D.regularPyramid.volume(pyramidBaseArea, pyramidHeight),
            unit: "cubic units"
          }
          break
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {uniqueInputs.map(input => (
            <div key={input.label} className="space-y-1">
              <label className="block text-sm font-medium">
                {input.label}
              </label>
              <input
                type="number"
                className="w-full p-2 border rounded-md bg-background text-foreground border-input focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={input.placeholder}
                value={inputs[input.label] || ""}
                onChange={(e) => handleInputChange(input.label, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <Button onClick={handleCalculate} disabled={isLoading}>
          {isLoading ? "Calculating..." : "Calculate All Properties"}
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