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
        note: "Interes",
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
        note: "Capital",
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
        note: "Tasa De Interes",
        properties: [
          { name: "Interes_Anual", allowedInputUnits: ["Dinero"] },
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "TasaDeInteres",
        handler: (params, uMedida) => {
          return this.TasaDeInteresSimpleComercial(params.Interes_Anual, params.Capital, params.Tiempo, uMedida);
        },
      },
      {
        topic: "Interes Compuesto",
        desc: "Cn = Co * (1 + i)ⁿ",
        note: "Valor Final",
        properties: [
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tasa_De_Interes", allowedInputUnits: ["TasaDeInteres"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "Dinero",
        handler: (params, uMedida) => {
          return this.valorFinalDeInteresCompuesto(params.Capital, params.Tasa_De_Interes, params.Tiempo, uMedida);
        },
      },
      {
        desc: "Co = Cn / (1 + i)ⁿ",
        note: "Capital",
        properties: [
          { name: "Valor_Final", allowedInputUnits: ["Dinero"] },
          { name: "Tasa_De_Interes", allowedInputUnits: ["TasaDeInteres"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "Dinero",
        handler: (params, uMedida) => {
          return this.capitalDeInteresCompuesto(params.Valor_Final, params.Tasa_De_Interes, params.Tiempo, uMedida);
        },
      },
      {
        desc: "n = Log(Cn/Co) / Log(1 + i)",
        note: "Tiempo",
        properties: [
          { name: "Valor_Final", allowedInputUnits: ["Dinero"] },
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tasa_De_Interes", allowedInputUnits: ["TasaDeInteres"] },
        ],
        units: "TiempoInteres",
        handler: (params, uMedida) => {
          return this.tiempoDeInteresCompuesto(params.Valor_Final, params.Capital, params.Tasa_De_Interes, uMedida);
        },
      },
      {
        desc: "i = ⁿ√(Cn/Co) -1",
        note: "Tasa De Interes",
        properties: [
          { name: "Valor_Final", allowedInputUnits: ["Dinero"] },
          { name: "Capital", allowedInputUnits: ["Dinero"] },
          { name: "Tiempo", allowedInputUnits: ["TiempoInteres"] },
        ],
        units: "TasaDeInteres",
        handler: (params, uMedida) => {
          return this.tasaInteresDeInteresCompuesto(params.Valor_Final, params.Capital, params.Tiempo, uMedida);
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

    return this.conversiones.convertirTasaDeInteres(tasaInteres, "Anual", uMedida.Salida);
  }

  // Cn = Co * (1 + i)ⁿ
  valorFinalDeInteresCompuesto(
    capital: number,
    tasaInteres: number,
    tiempo: number,
    uMedida: {
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Capital: typeof InputUnits.Dinero[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.Dinero[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(
      tiempo,
      uMedida.Tiempo,
      uMedida.Tasa_De_Interes == "Anual"
        ? "Anos"
        : uMedida.Tasa_De_Interes == "Trimestral"
        ? "Trimestres"
        : uMedida.Tasa_De_Interes == "Mensual"
        ? "Meses"
        : "Dias"
    );

    tasaInteres = tasaInteres / 100;

    // tasaInteres = this.conversiones.convertirTasaDeInteres(tasaInteres, uMedida.Tasa_De_Interes, "Anual");

    const valorFinal = capital * Math.pow(1 + tasaInteres, tiempo);

    return valorFinal;
  }

  // Co = Cn / (1 + i)ⁿ
  capitalDeInteresCompuesto(
    valorFinal: number,
    tasaInteres: number,
    tiempo: number,
    uMedida: {
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Valor_Final: typeof InputUnits.Dinero[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.Dinero[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(
      tiempo,
      uMedida.Tiempo,
      uMedida.Tasa_De_Interes == "Anual"
        ? "Anos"
        : uMedida.Tasa_De_Interes == "Trimestral"
        ? "Trimestres"
        : uMedida.Tasa_De_Interes == "Mensual"
        ? "Meses"
        : "Dias"
    );

    tasaInteres = tasaInteres / 100;

    // tasaInteres = this.conversiones.convertirTasaDeInteres(tasaInteres, uMedida.Tasa_De_Interes, "Anual");

    const capital = valorFinal / Math.pow(1 + tasaInteres, tiempo);

    return capital;
  }

  //n = Log(Cn/Co) / Log(1 + i)
  tiempoDeInteresCompuesto(
    valorFinal: number,
    capital: number,
    tasaInteres: number,
    uMedida: {
      Valor_Final: typeof InputUnits.Dinero[number];
      Capital: typeof InputUnits.Dinero[number];
      Tasa_De_Interes: typeof InputUnits.TasaDeInteres[number];
      Salida: typeof InputUnits.TiempoInteres[number];
    }
  ) {
    // convertir variables a sus unidades bases

    tasaInteres = tasaInteres / 100;

    tasaInteres = this.conversiones.convertirTasaDeInteres(tasaInteres, uMedida.Tasa_De_Interes, "Anual");

    const tiempo = Math.log(valorFinal / capital) / Math.log(1 + tasaInteres);

    return this.conversiones.convertirTiempoInteres(
      tiempo,
      "Anos",
      /*  uMedida.Tasa_De_Interes == "Anual"
        ? "Anos"
        : uMedida.Tasa_De_Interes == "Trimestral"
        ? "Trimestres"
        : uMedida.Tasa_De_Interes == "Mensual"
        ? "Meses"
        : "Dias", */
      uMedida.Salida
    );
  }

  //i = ⁿ√(Cn/Co) -1
  tasaInteresDeInteresCompuesto(
    valorFinal: number,
    capital: number,
    tiempo: number,
    uMedida: {
      Valor_Final: typeof InputUnits.Dinero[number];
      Capital: typeof InputUnits.Dinero[number];
      Tiempo: typeof InputUnits.TiempoInteres[number];
      Salida: typeof InputUnits.TasaDeInteres[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempoInteres(tiempo, uMedida.Tiempo, "Anos");

    const tasaInteres = Math.pow(valorFinal / capital, 1 / tiempo) - 1;

    return this.conversiones.convertirTasaDeInteres(
      tasaInteres,
      "Anual",
      /*  uMedida.Tiempo == "Anos"
        ? "Anual"
        : uMedida.Tiempo == "Trimestres"
        ? "Trimestral"
        : uMedida.Tiempo == "Dias"
        ? "Diaria"
        : "Mensual",
      uMedida.Salida */
      uMedida.Salida
    );
  }
}
