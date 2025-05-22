export type Shape = {
  name: string;
  category: "2D" | "3D";
  calculations: string[];
  requiredInputs: {
    [key: string]: {
      label: string;
      type: "number";
      placeholder: string;
    }[];
  };
}

export type CalculationResult = {
  value: number;
  unit: string;
} 