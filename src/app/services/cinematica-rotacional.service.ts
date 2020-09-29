import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService, InputUnits } from "./conversiones.service";

@Injectable({
  providedIn: "root",
})
export class CinematicaRotacionalService extends SuperTopic {
  constructor(private conversiones: ConversionesService) {
    super("Cinematica Rotacional", [
      //#region Momento de torcion
      {
        topic: "Momento de torcion",
        desc: "τ = F * r * sen Ѳ",
        properties: [
          { name: "Fuerza", allowedInputUnits: ["Fuerza"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Angulo", allowedInputUnits: ["Angulo"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params: { Fuerza: number; Radio: number; Angulo: number }, uMedida) => {
          return this.MomentoDeTorcion(params.Fuerza, params.Radio, params.Angulo, uMedida);
        },
      },
      {
        desc: "τ = F * d",
        properties: [
          { name: "Fuerza", allowedInputUnits: ["Fuerza"] },
          { name: "Palanca", allowedInputUnits: ["Longitud"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.MomentoDeTorcion2(params.Fuerza, params.Palanca, uMedida);
        },
      },
      {
        desc: "τ = I * ω",
        properties: [
          { name: "Inercia", allowedInputUnits: ["Inercia"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.MomentoDeTorcion3(params.Inercia, params.Velocidad, uMedida);
        },
      },
      {
        desc: "∑τ = I * α",
        properties: [
          { name: "Inercia", allowedInputUnits: ["Inercia"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion_Angular"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.TorqueNeto(params.Inercia, params.Aceleracion, uMedida);
        },
      },
      {
        desc: "τ = P /  ω",
        properties: [
          { name: "Potencia", allowedInputUnits: ["Potencia"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.MomentoDeTorcion4(params.Potencia, params.Velocidad, uMedida);
        },
      },
      {
        desc: "τ = Vector del radio *  Vector de la fuerza",
        properties: [
          { name: "Radio: Valor1", allowedInputUnits: ["Componentes"] },
          { name: "Radio: Valor2", allowedInputUnits: ["Componentes"] },
          { name: "Fuerza: Valor1", allowedInputUnits: ["Componentes"] },
          { name: "Fuerza: Valor2", allowedInputUnits: ["Componentes"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.MomentoDeTorcion5(params.Valor1, params.Valor2, uMedida);
        },
        //J K I
        validateComponentes: (input1: any, input2: any) => {
          const allow = input1.units;
          for (let i = 0; i < allow.length; i++) {
            //Se comprueba que el valor1 selecccionado no este en la lista de componentes del segundo
            if (input2.selectedU == allow[i]) {
              input1.units.pop(allow[i]);
            }

            if (input1.selectedU == allow[i]) {
              input1.units.pop(allow[i]);
            }
          }
        },
      },
      //#endregion

      //#region PalancaDeTorcion
      {
        topic: "Palanca De Torcion",
        desc: "d = r * sen ǿ",
        properties: [
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Angulo", allowedInputUnits: ["Angulo"] },
        ],
        units: "Longitud",
        handler: (params, uMedida) => {
          return this.PalancaDeTorcion(params.Radio, params.Angulo, uMedida);
        },
      },
      //#endregion

      //#region Momento de inercia
      {
        topic: " Momento de inercia",
        desc: "I = m * r²",
        properties: [
          { name: "Masa", allowedInputUnits: ["Peso"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
        ],
        units: "MomentoDeTorcion",
        handler: (params, uMedida) => {
          return this.Inercia(params.Masa, params.Radio, uMedida);
        },
      },
      {
        desc: "I = ∑τ / α",
        properties: [
          { name: "Torque_Neto", allowedInputUnits: ["MomentoDeTorcion"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion_Angular"] },
        ],
        units: "Potencia",
        handler: (params, uMedida) => {
          return this.Inercia2(params.Torque_Neto, params.Aceleracion, uMedida);
        },
      },
      //#endregion

      //#region POTENCIA
      {
        topic: "Potencia",
        desc: "P = τ * ω",
        properties: [
          { name: "Torque", allowedInputUnits: ["MomentoDeTorcion"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
        ],
        units: "Potencia",
        handler: (params, uMedida) => {
          return this.Potencia(params.Torque, params.Velocidad, uMedida);
        },
      },
      {
        desc: "P = W / t",
        properties: [
          { name: "Trabajo", allowedInputUnits: ["Trabajo"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Potencia",
        handler: (params, uMedida) => {
          return this.Potencia2(params.Trabajo, params.Tiempo, uMedida);
        },
      },
      //#endregion

      //#region Trabajo
      {
        topic: "Trabajo",
        desc: "W = (1/2 * I * Wf²)  -  (1/2 * I * Wi²)",
        properties: [
          { name: "Trabajo_Inicial", allowedInputUnits: ["Trabajo"] },
          { name: "Trabajo_Final", allowedInputUnits: ["Trabajo"] },
          { name: "Inercia", allowedInputUnits: ["Inercia"] },
        ],
        units: "Trabajo",
        handler: (params, uMedida) => {
          return this.Trabajo(params.Inercia, params.Trabajo_Inicial, params.Trabajo, uMedida);
        },
      },
      {
        desc: "W = P / t",
        properties: [
          { name: "Potencia", allowedInputUnits: ["Potencia"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Trabajo",
        handler: (params, uMedida) => {
          return this.Trabajo2(params.Potencia, params.Tiempo, uMedida);
        },
      },
      {
        desc: "W = M * G * H",
        properties: [
          { name: "Masa", allowedInputUnits: ["Peso"] },
          { name: "Gravedad", allowedInputUnits: ["none"] },
          { name: "Altura", allowedInputUnits: ["Longitud"] },
        ],
        units: "Trabajo",
        handler: (params, uMedida) => {
          return this.Trabajo3(params.Masa, params.Altura, uMedida);
        },
      },
      //#endregion

      //#region Fuerza Tangencial
      {
        topic: "Fuerza Tangencial",
        desc: "Ft = At / M",
        properties: [
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion"] },
          { name: "Masa", allowedInputUnits: ["Peso"] },
        ],
        units: "Fuerza",
        handler: (params, uMedida) => {
          return this.FuerzaTangencial(params.Aceleracion, params.Masa, uMedida);
        },
      },
      //#endregion

      //#region Masa
      {
        topic: "Masa",
        desc: "M = Ft / At",
        properties: [
          { name: "Fuerza", allowedInputUnits: ["Fuerza"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion"] },
        ],
        units: "Peso",
        handler: (params, uMedida) => {
          return this.Masa(params.Fuerza, params.Aceleracion, uMedida);
        },
      },
      //#endregion
    ]);
  }

  // W = (1/2 * I * Wf²)  -  (1/2 * I * Wi²)
  Trabajo(
    Inercia: number,
    wInicial: number,
    wFinal: number,
    uMedida: {
      Inercia: typeof InputUnits.Inercia[number];
      wInicial: typeof InputUnits.Trabajo[number];
      wFinal: typeof InputUnits.Trabajo[number];
      Salida: typeof InputUnits.Trabajo[number];
    }
  ) {
    const trabajo = 0.5 * Inercia * Math.pow(wFinal, 2) - 0.5 * Inercia * Math.pow(wInicial, 2);

    return trabajo;
  }

  //W = P / t
  Trabajo2(
    potencia: number,
    tiempo: number,
    uMedida: {
      Potencia: typeof InputUnits.Potencia[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Trabajo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");

    const trabajo = potencia / tiempo;

    return trabajo;
  }

  // W = M * G * H
  Trabajo3(
    masa: number,
    altura: number,
    uMedida: {
      Mada: typeof InputUnits.Peso[number];
      Altura: typeof InputUnits.Longitud[number];
    }
  ) {
    // convertir variables a sus unidades bases
    altura = this.conversiones.convertirLongitud(altura, uMedida.Altura, "M");

    const trabajo = masa * 9.8 * altura;

    return trabajo;
  }

  // Ft = At / M
  FuerzaTangencial(
    Aceleracion: number,
    masa: number,
    uMedida: {
      Aceleracion: typeof InputUnits.Aceleracion[number];
      Masa: typeof InputUnits.Peso[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Aceleracion = this.conversiones.convertirAceleracion(Aceleracion, uMedida.Aceleracion, "M/s²");

    const fuerza = Aceleracion / masa;

    return fuerza;
  }

  Masa(
    fuerza: number,
    Aceleracion: number,
    uMedida: {
      Aceleracion: typeof InputUnits.Aceleracion[number];
      Fuerza: typeof InputUnits.Fuerza[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Aceleracion = this.conversiones.convertirAceleracion(Aceleracion, uMedida.Aceleracion, "M/s²");

    const masa = fuerza / Aceleracion;

    return masa;
  }

  // τ = F * r * sen Ѳ
  MomentoDeTorcion(
    fuerza: number,
    radio: number,
    angulo: number,
    uMedida: {
      Fuerza: typeof InputUnits.Fuerza[number];
      Radio: typeof InputUnits.Longitud[number];
      Angulo: typeof InputUnits.Angulo[number];
      Salida: typeof InputUnits.MomentoDeTorcion[number];
    }
  ) {
    // convertir variables a sus unidades bases
    angulo = this.conversiones.convertirAngulo(angulo, uMedida.Angulo);
    radio = this.conversiones.convertirLongitud(radio, uMedida.Radio, "M");

    const seno = Math.sin(angulo);
    return radio * fuerza * seno;
  }

  MomentoDeTorcion2(
    fuerza: number,
    Palanca: number,
    uMedida: {
      Fuerza: typeof InputUnits.Fuerza[number];
      Palanca: typeof InputUnits.Longitud[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Palanca = this.conversiones.convertirLongitud(Palanca, uMedida.Palanca, "M");

    return fuerza * Palanca;
  }

  // τ = I * ω;
  MomentoDeTorcion3(
    Inercia: number,
    VelocidadAngular: number,
    uMedida: {
      Inercia: typeof InputUnits.Inercia[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Salida: typeof InputUnits.MomentoDeTorcion;
    }
  ) {
    // convertir variables a sus unidades bases
    VelocidadAngular = this.conversiones.convertirVelocidadAngular(VelocidadAngular, uMedida.Velocidad, "Rad/s");

    const torque = Inercia * VelocidadAngular;
    return torque;
  }

  // τ = P / ω;
  MomentoDeTorcion4(
    Potencia: number,
    VelocidadAngular: number,
    uMedida: {
      Potencia: typeof InputUnits.Potencia[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    VelocidadAngular = this.conversiones.convertirVelocidadAngular(VelocidadAngular, uMedida.Velocidad, "Rad/s");

    const torque = Potencia / VelocidadAngular;
    return torque;
  }

  MomentoDeTorcion5(
    Radio: any,
    Fuerza: any,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Fuerza: typeof InputUnits.Fuerza[number];
    }
  ) {
    // τ = P / ω
    return 0;
  }

  // ∑τ = I * α
  TorqueNeto(
    Inercia: number,
    Aceleracion: number,
    uMedida: {
      Inercia: typeof InputUnits.Inercia[number];
      Aceleracion: typeof InputUnits.Aceleracion_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Aceleracion = this.conversiones.convertirAceleracion(Aceleracion, uMedida.Aceleracion, "Rad/s²");

    const torque = Inercia * Aceleracion;

    return torque;
  }

  // I = m * r²
  Inercia(
    masa: number,
    Radio: number,
    uMedida: { Masa: typeof InputUnits.Peso[number]; Radio: typeof InputUnits.Longitud[number] }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");

    const inercia = masa * Math.pow(Radio, 2);

    return inercia;
  }

  // I = ∑τ / α
  Inercia2(
    TorqueNeto: number,
    Aceleracion: number,
    uMedida: {
      TorqueNeto: typeof InputUnits.Fuerza[number];
      Aceleracion: typeof InputUnits.Aceleracion_Angular[number];
      Salida: typeof InputUnits.Potencia[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Aceleracion = this.conversiones.convertirAceleracion(Aceleracion, uMedida.Aceleracion, "Rad/s²");

    const inercia = TorqueNeto / Aceleracion;
    return inercia;
  }

  // d = r * sen ǿ
  PalancaDeTorcion(
    radio: number,
    angulo: number,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Angulo: typeof InputUnits.Angulo[number];
      Salida: typeof InputUnits.Longitud[number];
    }
  ) {
    // convertir variables a sus unidades bases
    angulo = this.conversiones.convertirAngulo(angulo, uMedida.Angulo);
    radio = this.conversiones.convertirLongitud(radio, uMedida.Radio, "M");
    const seno = Math.sin(angulo);
    const palanca = radio * seno;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirLongitud(palanca, "M", uMedida.Salida);
  }

  //P = τ * ω
  Potencia(
    Torque: number,
    Velocidad: number,
    uMedida: {
      Torque: typeof InputUnits.MomentoDeTorcion[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Velocidad = this.conversiones.convertirVelocidadAngular(Velocidad, uMedida.Velocidad, "Rad/s");

    const potencia = Torque * Velocidad;

    return potencia;
  }

  // P = W / t
  Potencia2(
    trabajo: number,
    tiempo: number,
    uMedida: {
      Trabajo: typeof InputUnits.Trabajo[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Potencia[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");

    const potencia = trabajo / tiempo;
    return potencia;
  }
}
