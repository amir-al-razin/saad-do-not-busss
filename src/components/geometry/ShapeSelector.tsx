"use client"

import { Button } from "@/components/ui/button"
import { Shape } from "@/types/geometry"
import { useState } from "react"
import {
  Circle,
  Square,
  Triangle,
  Hexagon,
  Octagon,
  Diamond,
  Box,
  Cylinder,
  Cone,
  Search
} from "lucide-react"
import clsx from "clsx"

interface ShapeSelectorProps {
  shapes: Shape[];
  onSelect: (shape: Shape) => void;
}

const shapeType: { [key: string]: "2D" | "3D" } = {
  "Circle": "2D",
  "Ellipse": "2D",
  "Square": "2D",
  "Rectangle": "2D",
  "Trapezium": "2D",
  "Parallelogram": "2D",
  "Rhombus": "2D",
  "Regular Polygon": "2D",
  "Equilateral Triangle": "2D",
  "Isosceles Triangle": "2D",
  "Scalene Triangle": "2D",
  "Right Triangle": "2D",
  "Cube": "3D",
  "Box": "3D",
  "Sphere": "3D",
  "Cylinder": "3D",
  "Cone": "3D",
  "Regular Prism": "3D",
  "Regular Pyramid": "3D"
}

const getIcon = (shapeName: string) => {
  const baseClass = "h-5 w-5 mr-2 transition-colors";
  const type = shapeType[shapeName];
  const colorClass = type === "2D"
    ? "group-hover:text-blue-600"
    : "group-hover:text-green-600";
  const iconProps = { className: clsx(baseClass, colorClass) };
  switch (shapeName) {
    case "Circle":
    case "Ellipse":
    case "Sphere":
      return <Circle {...iconProps} />;
    case "Square":
    case "Rectangle":
    case "Parallelogram":
      return <Square {...iconProps} />;
    case "Trapezium":
      return <Hexagon {...iconProps} />;
    case "Rhombus":
      return <Diamond {...iconProps} />;
    case "Regular Polygon":
      return <Octagon {...iconProps} />;
    case "Equilateral Triangle":
    case "Isosceles Triangle":
    case "Scalene Triangle":
    case "Right Triangle":
      return <Triangle {...iconProps} />;
    case "Cube":
    case "Box":
    case "Regular Prism":
      return <Box {...iconProps} />;
    case "Cylinder":
      return <Cylinder {...iconProps} />;
    case "Cone":
    case "Regular Pyramid":
      return <Cone {...iconProps} />;
    default:
      return null;
  }
}

export function ShapeSelector({ shapes, onSelect }: ShapeSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredShapes = shapes.filter(shape => 
    shape.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="relative">
        <input
          type="text"
          placeholder="Search shapes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground border-input"
        />
        <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">2D Shapes</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredShapes
              .filter(shape => shape.category === "2D")
              .map(shape => (
                <Button
                  key={shape.name}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-colors group"
                  onClick={() => onSelect(shape)}
                >
                  {getIcon(shape.name)}
                  <span>{shape.name}</span>
                </Button>
              ))}
            {filteredShapes.filter(shape => shape.category === "2D").length === 0 && (
              <p className="col-span-2 text-muted-foreground text-center">No matching 2D shapes found</p>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4">3D Shapes</h2>
          <div className="grid grid-cols-2 gap-3">
            {filteredShapes
              .filter(shape => shape.category === "3D")
              .map(shape => (
                <Button
                  key={shape.name}
                  variant="outline"
                  className="justify-start h-auto py-3 px-4 hover:bg-accent hover:text-accent-foreground transition-colors group"
                  onClick={() => onSelect(shape)}
                >
                  {getIcon(shape.name)}
                  <span>{shape.name}</span>
                </Button>
              ))}
            {filteredShapes.filter(shape => shape.category === "3D").length === 0 && (
              <p className="col-span-2 text-muted-foreground text-center">No matching 3D shapes found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 