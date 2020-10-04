import { PhysicVariable } from "../services/conversiones.service";

export interface HistoryRecord {
  formula: Partial<Formula>;
  unidadSalida: string;
  dataEntries: Array<DataEntry>;
  result: number;
}

export interface DataEntry {
  name: string;
  value: number;
  unit: string;
}

export interface Formula {
  topic?: string;
  desc: string;
  note?: string;
  properties: Array<{
    name: string;
    allowedInputUnits: PhysicVariable[]; //the input units of the specified physic variable are allowed
  }>;
  units: PhysicVariable;
  handler: (params: any, uMedida) => number;
  validateComponentes?: (input1: { units: string[] }, input2: { units: string[] }) => void;
}

export class SuperTopic {
  name = "";
  formulas = new Array<Formula>();

  constructor(name: string, formulas: Array<Formula>) {
    this.name = name;
    this.formulas = formulas;
  }
}
