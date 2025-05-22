"use client"

import { Button } from "@/components/ui/button"
import { Shape } from "@/types/geometry"
import { useState } from "react"

interface ShapeSelectorProps {
  shapes: Shape[];
  onSelect: (shape: Shape) => void;
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
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
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
                  className="justify-start"
                  onClick={() => onSelect(shape)}
                >
                  {shape.name}
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
                  className="justify-start"
                  onClick={() => onSelect(shape)}
                >
                  {shape.name}
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