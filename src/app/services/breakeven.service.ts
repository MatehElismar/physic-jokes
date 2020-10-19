import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService, InputUnits } from "./conversiones.service";

@Injectable({
  providedIn: "root",
})
export class BreakevenService extends SuperTopic {
  constructor(private conversiones: ConversionesService) {
    super("Punto De Equilibrio", [
      {
        topic: "Punto De Equilibrio",
        desc: "P.E. = CF / P - CV",
        note: "Punto De Equilibrio",
        properties: [
          { name: "Costos_Fijos", allowedInputUnits: ["Dinero"] },
          { name: "Precio_Unitario", allowedInputUnits: ["Dinero"] },
          { name: "Costo_Variable_Unitario", allowedInputUnits: ["Dinero"] },
        ],
        units: "null",
        handler: (params, uMedida) => {
          return this.calcularPuntoDeEquilibrio(
            params.Costos_Fijos,
            params.Precio_Unitario,
            params.Costo_Variable_Unitario,
            uMedida
          );
        },
        glosario: [
          { term: "P.E", desc: "Punto De Equilibrio" },
          { term: "P", desc: "Precio Unitario" },
          { term: "CV", desc: "Costo Variable Unitario " },
        ],
      },
      {
        desc: "P.E. = CF / MC",
        note: "Punto De Equilibrio",
        properties: [
          { name: "Costos_Fijos", allowedInputUnits: ["Dinero"] },
          { name: "Margen_De_Contribucion", allowedInputUnits: ["Dinero"] },
        ],
        units: "null",
        handler: (params, uMedida) => {
          return this.calcularPuntoDeEquilibrio2(params.Costos_Fijos, params.Margen_De_Contribucion, uMedida);
        },
        glosario: [
          { term: "P.E", desc: "Punto De Equilibrio" },
          { term: "CV", desc: "Costos Fijos" },
          { term: "MC", desc: "Margen De Contribucion" },
        ],
      },
    ]);
  }

  // P.E. = CF / P - CV
  calcularPuntoDeEquilibrio(
    costosFijos: number,
    precioUnitario: number,
    costoVariableUnitario: number,
    uMedida: {
      Costos_Fijos: typeof InputUnits.Dinero[number];
      Precio_Unitario: typeof InputUnits.Dinero[number];
      Costo_Variable_Unitario: typeof InputUnits.Dinero[number];
      Salida: typeof InputUnits.none[number];
    }
  ) {
    // convertir variables a sus unidades bases

    let PE = costosFijos / (precioUnitario - costoVariableUnitario);

    return PE;
  }

  // P.E. = CF / MC
  calcularPuntoDeEquilibrio2(
    costosFijos: number,
    margenDeContribucion: number,
    uMedida: {
      Costos_Fijos: typeof InputUnits.Dinero[number];
      Precio_Unitario: typeof InputUnits.Dinero[number];
      Costo_Variable_Unitario: typeof InputUnits.Dinero[number];
      Salida: typeof InputUnits.none[number];
    }
  ) {
    // convertir variables a sus unidades bases

    let PE = costosFijos / margenDeContribucion;

    return PE;
  }
}
