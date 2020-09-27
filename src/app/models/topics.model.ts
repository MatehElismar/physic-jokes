export interface Formula {
  topic?: string;
  desc: string;
  properties: Array<{ name: string; allowedInputUnits: string }>;
  units: string;
  handler: (params: any, inputUnit: any, outputUnit: string) => number;
  validateUnits?: (input1: { units: string[] }, input2: { units: string[] }) => void;
}

export class SuperTopic {
  name = "";
  formulas = new Array<Formula>();

  constructor(name: string, formulas: Array<Formula>) {
    this.name = name;
    this.formulas = formulas;
  }
}
