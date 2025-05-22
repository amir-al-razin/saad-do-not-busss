"use client"

import { CalculationResult } from "@/types/geometry"

interface ResultsProps {
  results: { [key: string]: CalculationResult };
}

export function Results({ results }: ResultsProps) {
  if (Object.keys(results).length === 0) {
    return (
      <div className="p-4 bg-muted rounded-md">
        <p className="text-muted-foreground text-center">Enter values and click Calculate to see results</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-muted rounded-md space-y-2">
      <h3 className="font-medium">Results:</h3>
      {Object.entries(results).map(([calc, result]) => (
        <div key={calc} className="flex justify-between items-center">
          <span className="font-medium">{calc}:</span>
          <span>
            {isNaN(result.value) 
              ? "Invalid input" 
              : `${result.value.toFixed(2)} ${result.unit}`}
          </span>
        </div>
      ))}
    </div>
  )
} 