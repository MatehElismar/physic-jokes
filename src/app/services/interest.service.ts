import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService, InputUnits } from "./conversiones.service";

@Injectable({
  providedIn: "root",
})
export class InterestService extends SuperTopic {
  constructor(private conversiones: ConversionesService) {
    super("Intereses", [
      {
        topic: "Interes Simple",
        desc: "I = c * i * t",
        properties: [
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tasa_De_Interes", allowedInputUnits: ["TasaDeInteres"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "Dinero",
        handler: (params, uMedida) => {
          return this.interesSimpleComercial(params.Capital, params.Tasa_De_Interes, params.Tiempo, uMedida);
        },
      },
      {
        desc: "c = I / t * i",
        properties: [
          { name: "Interes", allowedInputUnits: ["Dinero"] },
          { name: "Tasa_De_Interes", allowedInputUnits: ["TasaDeInteres"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "Dinero",
        handler: (params, uMedida) => {
          return this.CapitalDeInteresSimpleComercial(params.Interes, params.Tasa_De_Interes, params.Tiempo, uMedida);
        },
      },
      {
        desc: "i =  I/ c * t",
        properties: [
          { name: "Interes_Anual", allowedInputUnits: ["Dinero"] },
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "Dinero",
        handler: (params, uMedida) => {
          return this.TasaDeInteresSimpleComercial(params.Interes_Anual, params.Capital, params.Tiempo, uMedida);
        },
      },
    ]);
  }

  // I = c * i * t;
  interesSimple(
    capital: number,
    tasaInteres: number,
    tiempo: number,
    uMedida: {
      Capital: typeof InputUnits.Dinero[number];
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.Dinero[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(
      tiempo,
      uMedida.Tiempo,
      uMedida.Tasa_De_Interes == "Anual" ? "Anos" : "Meses"
    );
    // tiempo = this.conversiones.convertirTiempoInteres(tiempo, uMedida.Tiempo, "Meses");

    tasaInteres = tasaInteres / 100; //bring the tasaInteres from percent to decimal
    let interes = capital * tasaInteres * tiempo;

    return interes;
  }

  // I = c * i * t;
  interesSimpleComercial(
    capital: number,
    tasaInteres: number,
    tiempo: number,
    uMedida: {
      Capital: typeof InputUnits.Dinero[number];
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.Dinero[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(tiempo, uMedida.Tiempo, "Dias");

    tasaInteres = tasaInteres / 100; //bring the tasaInteres from percent to decimal

    tasaInteres = this.conversiones.convertirTasaDeInteres(tasaInteres, uMedida.Tasa_De_Interes, "Diaria");

    let interes = capital * tasaInteres * tiempo;

    // interes = this.conversiones.convertirTasaDeInteres(interes, "Diaria", uMedida.Tasa_De_Interes);

    return interes;
  }

  // c = I /t * i
  CapitalDeInteresSimpleComercial(
    interes: number,
    tasaInteres: number,
    tiempo: number,
    uMedida: {
      Interes: typeof InputUnits.Dinero[number];
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.Dinero[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(tiempo, uMedida.Tiempo, "Dias");

    tasaInteres = tasaInteres / 100; //bring the tasaInteres from percent to decimal

    tasaInteres = this.conversiones.convertirTasaDeInteres(tasaInteres, uMedida.Tasa_De_Interes, "Diaria");

    let capital = interes / (tasaInteres * tiempo);

    return capital;
  }

  // i =  I / c * t
  TasaDeInteresSimpleComercial(
    interes: number,
    capital: number,
    tiempo: number,
    uMedida: {
      Interes: typeof InputUnits.Dinero[number];
      Capital: typeof InputUnits.Dinero[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.TasaDeInteres[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(tiempo, uMedida.Tiempo, "Anos");

    let tasaInteres = interes / (capital * tiempo);

    return tasaInteres;
  }
}
