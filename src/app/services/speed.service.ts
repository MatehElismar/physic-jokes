import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService, InputUnits } from "./conversiones.service";

@Injectable({
  providedIn: "root",
})
export class SpeedService extends SuperTopic {
  constructor(private conversiones: ConversionesService) {
    super("Velocidad Angular", [
      //#region Velocidad Angular
      {
        topic: "Velocidad Angular",
        desc: " ω = 2π/T",
        properties: [
          {
            name: "Periodo",
            allowedInputUnits: ["Tiempo"],
          },
          {
            name: "PI",
            allowedInputUnits: ["none"],
          },
        ],

        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed2(params.Periodo, uMedida);
        },
      },
      {
        desc: " ω = ωﺃ + α * t",
        properties: [
          { name: "Velocidad_Inicial", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion_Angular"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed1(params.Velocidad_Inicial, params.Aceleracion, params.Tiempo, uMedida);
        },
      },
      {
        desc: " ω = Ɵ / t",
        properties: [
          { name: "Arco", allowedInputUnits: ["Arco"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed(params.Arco, params.Tiempo, uMedida);
        },
      },
      {
        desc: "ω = 2π * f",
        properties: [
          { name: "PI", allowedInputUnits: ["none"] },
          { name: "Frecuencia", allowedInputUnits: ["Frecuencia"] },
        ],
        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed3(params.Frecuencia, uMedida);
        },
      },
      {
        desc: "ω = Vt / r",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
        ],
        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed4(params.Velocidad, params.Radio, uMedida);
        },
      },
      {
        desc: "ω = P / τ",
        properties: [
          { name: "Potencia", allowedInputUnits: ["Potencia"] },
          { name: "Torque", allowedInputUnits: ["MomentoDeTorcion"] },
        ],
        units: "Velocidad_Angular",
        handler: (params, uMedida) => {
          return this.CircularSpeed5(params.Potencia, params.Torque, uMedida);
        },
      },
      //#endregion
      //#region Velocidad Tangencial
      {
        topic: "Velocidad Tangencial",
        desc: "Vt = 2π * r / T",
        properties: [
          { name: "PI", allowedInputUnits: ["none"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Periodo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Velocidad",
        handler: (params, uMedida) => {
          return this.VelocidadTangencial(params.Radio, params.Periodo, uMedida);
        },
      },
      {
        desc: "Vt = 2π * r * f",
        properties: [
          { name: "PI", allowedInputUnits: ["none"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Frecuencia", allowedInputUnits: ["Frecuencia"] },
        ],
        units: "Velocidad",
        handler: (params, uMedida) => {
          return this.VelocidadTangencial_1(params.Radio, params.Frecuencia, uMedida);
        },
      },
      {
        desc: "Vt = ω * r",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
        ],
        units: "Velocidad",
        handler: (params, uMedida) => {
          return this.VelocidadTangencial_2(params.Velocidad, params.Radio, uMedida);
        },
      },
      //#endregion
      //#region Aceleracion Angular
      {
        topic: "Aceleracion Angular",
        desc: "α = ωf - ωﺃ / t",
        properties: [
          { name: "Velocidad_Inicial", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Velocidad_Final", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Aceleracion_Angular",
        handler: (params, uMedida) => {
          return this.Aceleracion(params.Velocidad_Final, params.Velocidad_Inicial, params.Tiempo, uMedida);
        },
      },
      {
        desc: "α = ω / t",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Aceleracion_Angular",
        handler: (params, uMedida) => {
          return this.Aceleracion3(params.Velocidad, params.Tiempo, uMedida);
        },
      },
      {
        desc: "α = At / r",
        properties: [
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion"] },
          { name: "Radio", allowedInputUnits: ["Longitud"] },
        ],
        units: "Aceleracion_Angular",
        handler: (params, uMedida) => {
          return this.Aceleracion2(params.Aceleracion, params.Radio, uMedida);
        },
      },
      //#endregion
      //#region Aceleracion TAngencial
      {
        topic: "Aceleracion Tangencial",
        desc: "At = r * α",
        properties: [
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion_Angular"] },
        ],
        units: "Aceleracion",
        handler: (params, uMedida) => {
          return this.AceleracionTangencial(params.Radio, params.Aceleracion, uMedida);
        },
      },
      {
        desc: "At = Ft / M", //Fuerza tangencial entre la masa
        properties: [
          { name: "Fuerza", allowedInputUnits: ["Fuerza"] },
          { name: "Masa", allowedInputUnits: ["Peso"] },
        ],
        units: "Aceleracion",
        handler: (params, uMedida) => {
          return this.AceleracionTangencial2(params.Fuerza, params.Masa, uMedida);
        },
      },
      //#endregion
      //#region tiempo
      {
        topic: "Tiempo",
        desc: "t = Ɵ / ω",
        properties: [
          { name: "Arco", allowedInputUnits: ["Arco"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
        ],
        units: "Tiempo",
        handler: (params, uMedida) => {
          return this.CircularTime(params.Arco, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region Frecuencia
      {
        topic: "Frecuencia",
        desc: " f = 1 / T",
        properties: [{ name: "Periodo", allowedInputUnits: ["Tiempo"] }],
        units: "Frecuencia",
        handler: (params, uMedida) => {
          return this.Frecuencia(params.Periodo, uMedida);
        },
      },
      {
        desc: " f = Vt / 2π * r",
        properties: [
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
        ],
        units: "Frecuencia",
        handler: (params, uMedida) => {
          return this.Frecuencia1(params.Radio, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region periodo
      {
        topic: "Periodo",
        desc: " T = 1 / f",
        properties: [{ name: "Frecuencia", allowedInputUnits: ["Frecuencia"] }],
        units: "Tiempo",
        handler: (params, uMedida) => {
          return this.Periodo(params.Frecuencia, uMedida);
        },
      },
      {
        desc: " T = 2π / ω",
        properties: [{ name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] }],
        units: "Tiempo",
        handler: (params, uMedida) => {
          return this.Periodo2(params.Velocidad, uMedida);
        },
      },
      {
        desc: " T = 2π * r / Vt",
        properties: [
          { name: "Radio", allowedInputUnits: ["Longitud"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
        ],
        units: "Tiempo",
        handler: (params, uMedida) => {
          return this.Periodo1(params.Radio, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region Desplazamiento
      {
        topic: "Desplazamiento Angular",
        desc: "Ɵ = ω * t",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Arco",
        handler: (params, uMedida) => {
          return this.ArcoRecorrido(params.Velocidad, params.Tiempo, uMedida);
        },
      },
      {
        desc: "Ɵf = Ɵ1 + (ω * t) + 1/2 (α * t²)",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad_Angular"] },
          { name: "Arco_Inicial", allowedInputUnits: ["Arco"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion_Angular"] },
        ],
        units: "Arco",
        handler: (params, uMedida) => {
          return this.ArcoRecorrido2(params.Velocidad, params.Arco_Inicial, params.Tiempo, params.Aceleracion, uMedida);
        },
      },
      //#endregion
    ]);
  }

  //#region Aceleracion
  // α = ωf - ωﺃ / t
  Aceleracion(
    velF: number,
    velI: number,
    tiempo: number,
    uMedida: {
      Velocidad_Inicial: typeof InputUnits.Velocidad_Angular[number];
      Velocidad_Final: typeof InputUnits.Velocidad_Angular[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Aceleracion_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    velF = this.conversiones.convertirVelocidadAngular(velF, uMedida.Velocidad_Final, "Rad/s");
    velI = this.conversiones.convertirVelocidadAngular(velF, uMedida.Velocidad_Inicial, "Rad/s");
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");

    const aceleracion = (velF - velI) / tiempo; //Rad/s

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirAceleracion(aceleracion, "Rad/s²", uMedida.Salida);
  }

  // α = At / r
  Aceleracion2(
    Aceleracion: number,
    Radio: number,
    uMedida: {
      Aceleracion: typeof InputUnits.Aceleracion[number];
      Radio: typeof InputUnits.Longitud[number];
      Salida: typeof InputUnits.Aceleracion_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Aceleracion = this.conversiones.convertirAceleracion(Aceleracion, uMedida.Aceleracion, "Rad/s²");
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");

    const aceleracion = Aceleracion / Radio; //rad/seg

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirAceleracion(aceleracion, "Rad/s²", uMedida.Salida);
  }

  // α = ω / t
  Aceleracion3(
    velocidad: number,
    tiempo: number,
    uMedida: {
      Tiempo: typeof InputUnits.Tiempo[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Salida: typeof InputUnits.Aceleracion_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    velocidad = this.conversiones.convertirVelocidadAngular(velocidad, uMedida.Velocidad, "Rad/s");
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");

    const aceleracion = velocidad / tiempo; //rad/seg

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirAceleracion(aceleracion, "Rad/s²", uMedida.Salida);
  }

  // At = r * α
  AceleracionTangencial(
    Radio: number,
    aceleracion: number,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Aceleracion: typeof InputUnits.Aceleracion_Angular[number];
      Salida: typeof InputUnits.Aceleracion[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    aceleracion = this.conversiones.convertirAceleracion(aceleracion, uMedida.Aceleracion, "Rad/s²");

    const aceleracionR = Radio * aceleracion; //Metros/s

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirAceleracion(aceleracionR, "Rad/s²", uMedida.Salida);
  }

  // At = Ft / m
  AceleracionTangencial2(
    Fuerza: number,
    Masa: number,
    uMedida: {
      Fuerza: typeof InputUnits.Fuerza[number];
      Masa: typeof InputUnits.Peso[number];
      Salida: typeof InputUnits.Aceleracion[number];
    }
  ) {
    //no hay conversiones
    const Aceleracion = Fuerza / Masa;
    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirAceleracion(Aceleracion, "M/s²", uMedida.Salida);
  }

  //#endregion

  //#region Velociad
  // ω = Ɵ / t;
  CircularSpeed(
    Arco: number,
    Tiempo: number,
    uMedida: {
      Arco: typeof InputUnits.Arco[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ): number {
    // convertir variables a sus unidades bases
    Tiempo = this.conversiones.convertirTiempo(Tiempo, uMedida.Tiempo, "s");
    Arco = this.conversiones.convertirArco(Arco, uMedida.Arco, "Rad");

    const speed = Arco / Tiempo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(speed, "Rad/s", uMedida.Salida);
  }

  // Velocidad
  //  ω = ωﺃ + α * t
  CircularSpeed1(
    initialSpeed: number,
    aceleracion: number,
    tiempo: number,
    uMedida: {
      Velocidad_Inicial: typeof InputUnits.Velocidad_Angular[number];
      Aceleracion: typeof InputUnits.Aceleracion_Angular[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ): number {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");
    aceleracion = this.conversiones.convertirAceleracion(tiempo, uMedida.Aceleracion, "Rad/s²");
    initialSpeed = this.conversiones.convertirVelocidadAngular(initialSpeed, uMedida.Velocidad_Inicial, "Rad/s");

    const vel = initialSpeed + aceleracion * tiempo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(vel, "Rad/s", uMedida.Salida);
  }

  // ω = 2π/T
  CircularSpeed2(
    Periodo: number,
    uMedida: {
      Periodo: typeof InputUnits.Tiempo[number];
      PI: typeof InputUnits.none[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Periodo = this.conversiones.convertirTiempo(Periodo, uMedida.Periodo, "s");

    const speed = (2 * 3.1416) / Periodo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(speed, "Rad/s", uMedida.Salida);
  }

  // ω = 2π * f
  CircularSpeed3(
    Frecuencia: number,
    uMedida: {
      Frecuencia: typeof InputUnits.Frecuencia[number];
      PI: typeof InputUnits.none[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Frecuencia = this.conversiones.convertirFrecuencia(Frecuencia, uMedida.Frecuencia, "Hz");

    const speed = 2 * 3.1416 * Frecuencia;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(speed, "Rad/s", uMedida.Salida);
  }

  // ω = Vt / r
  CircularSpeed4(
    Velocidad: number,
    Radio: number,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Velocidad: typeof InputUnits.Velocidad[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Velocidad = this.conversiones.convertirVelocidad(Velocidad, uMedida.Velocidad, "M/S");
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");

    const speed = Velocidad / Radio;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(speed, "Rad/s", uMedida.Salida);
  }

  // "ω = P / τ
  CircularSpeed5(
    Potencia: number,
    Torque: number,
    uMedida: {
      Potencia: typeof InputUnits.Potencia[number];
      Torque: typeof InputUnits.MomentoDeTorcion[number];
      Salida: typeof InputUnits.Velocidad_Angular[number];
    }
  ) {
    // ω = potencia / torque

    // No hay conversiones porque estas solo tienen units basicas
    const speed = Potencia / Torque;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidadAngular(speed, "Rad/s", uMedida.Salida);
  }

  // t = Ɵ / ω
  CircularTime(
    Arco: number,
    speed: number,
    uMedida: {
      Arco: typeof InputUnits.Arco[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Salida: typeof InputUnits.Tiempo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Arco = this.conversiones.convertirArco(Arco, uMedida.Arco, "Rad");
    speed = this.conversiones.convertirVelocidadAngular(speed, uMedida.Velocidad, "Rad/s");

    const time = Arco / speed;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirTiempo(time, "s", uMedida.Salida);
  }

  // Ɵ = ω * t
  ArcoRecorrido(
    velocidad: number,
    tiempo: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Arco[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");
    velocidad = this.conversiones.convertirVelocidadAngular(velocidad, uMedida.Velocidad, "Rad/s");

    const Arco = velocidad * tiempo; //en radianes

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirArco(Arco, "Rad", uMedida.Salida);
  }

  // Ɵf = Ɵ1 + (ω * t) + 1/2 (α * t²)
  ArcoRecorrido2(
    Velocidad: number,
    Arco_Inicial: number,
    Tiempo: number,
    Aceleracion: number,
    uMedida: {
      Arco_Inicial: typeof InputUnits.Arco[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Aceleracion: typeof InputUnits.Aceleracion_Angular[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Arco[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Velocidad = this.conversiones.convertirVelocidadAngular(Velocidad, uMedida.Velocidad, "Rad/s");
    Tiempo = this.conversiones.convertirTiempo(Tiempo, uMedida.Tiempo, "s");
    Arco_Inicial = this.conversiones.convertirArco(Arco_Inicial, uMedida.Arco_Inicial, "Rad");
    Aceleracion = this.conversiones.convertirAceleracion(Arco_Inicial, uMedida.Aceleracion, "Rad/s²");

    const arcoFinal = Arco_Inicial + Velocidad * Tiempo + (1 / 2) * (Aceleracion * Math.pow(Tiempo, 2));

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirArco(arcoFinal, "Rad", uMedida.Salida);
  }

  // T = 1 / f
  Periodo(
    Frecuencia: number,
    uMedida: {
      Frecuencia: typeof InputUnits.Frecuencia[number];
      Salida: typeof InputUnits.Tiempo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Frecuencia = this.conversiones.convertirFrecuencia(Frecuencia, uMedida.Frecuencia, "Hz");

    const periodo = 1 / Frecuencia;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirTiempo(periodo, "s", uMedida.Salida);
  }

  // T = 2π * r / Vt
  Periodo1(
    Radio: number,
    Velocidad: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad[number];
      Radio: typeof InputUnits.Longitud[number];
      PI: typeof InputUnits.none[number];
      Salida: typeof InputUnits.Tiempo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    Velocidad = this.conversiones.convertirVelocidad(Velocidad, uMedida.Velocidad, "M/S");

    const periodo = (2 * 3.1416 * Radio) / Velocidad;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirTiempo(periodo, "s", uMedida.Salida);
  }

  //  T = 2π / ω
  Periodo2(
    Velocidad: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      PI: typeof InputUnits.none[number];
      Salida: typeof InputUnits.Tiempo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Velocidad = this.conversiones.convertirVelocidadAngular(Velocidad, uMedida.Velocidad, "Rad/s");

    const periodo = (2 * 3.1416) / Velocidad;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirTiempo(periodo, "s", uMedida.Salida);
  }

  // f = 1 / T
  Frecuencia(
    Periodo: number,
    uMedida: {
      Periodo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Frecuencia[number];
    }
  ) {
    // el periodo viene en units de tiempo, por lo que lo convertimos a s, que es su unidad oficial, antes de calcular el resltado
    // convertir variables a sus unidades bases
    Periodo = this.conversiones.convertirTiempo(Periodo, uMedida.Periodo, "s");

    const frecuencia = 1 / Periodo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirFrecuencia(frecuencia, "Hz", uMedida.Salida);
  }

  //  f = Vt / 2π * r
  Frecuencia1(
    Radio: number,
    Velocidad: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad[number];
      Radio: typeof InputUnits.Longitud[number];
      Salida: typeof InputUnits.Frecuencia[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    Velocidad = this.conversiones.convertirVelocidad(Velocidad, uMedida.Velocidad, "M/S");

    const Frecuencia = Velocidad / (2 * 3.1416 * Radio);

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirFrecuencia(Frecuencia, "Hz", uMedida.Salida);
  }

  // Vt = 2π * r / T"
  VelocidadTangencial(
    Radio: number,
    Periodo: number,
    uMedida: {
      PI: typeof InputUnits.none[number];
      Radio: typeof InputUnits.Longitud[number];
      Periodo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Velocidad[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    Periodo = this.conversiones.convertirTiempo(Periodo, uMedida.Periodo, "s");

    const vel = (2 * 3.1416 * Radio) / Periodo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidad(vel, "M/S", uMedida.Salida);
  }

  // 'Vt = 2π * r * f
  VelocidadTangencial_1(
    Radio: number,
    Frecuencia: number,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Frecuencia: typeof InputUnits.Frecuencia[number];
      Salida: typeof InputUnits.Velocidad[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    Frecuencia = this.conversiones.convertirFrecuencia(Frecuencia, uMedida.Frecuencia, "Hz");

    const vel = 2 * 3.1416 * Radio * Frecuencia;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidad(vel, "M/S", uMedida.Salida);
  }

  // ''Vt = ω * r
  VelocidadTangencial_2(
    Velocidad: number,
    Radio: number,
    uMedida: {
      Radio: typeof InputUnits.Longitud[number];
      Velocidad: typeof InputUnits.Velocidad_Angular[number];
      Salida: typeof InputUnits.Velocidad[number];
    }
  ) {
    // convertir variables a sus unidades bases
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    Velocidad = this.conversiones.convertirVelocidadAngular(Velocidad, uMedida.Velocidad, "Rad/s");

    const vel = Velocidad * Radio;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidad(vel, "M/S", uMedida.Salida);
  }
  //#endregion
}
