import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService, InputUnits } from "./conversiones.service";

@Injectable({
  providedIn: "root",
})
export class VelTransService extends SuperTopic {
  constructor(private conversiones: ConversionesService) {
    super("Velocidad Transaccional", [
      // topic: 'Velocidad',
      {
        topic: "Velocidad",
        desc: " v = v * + a * t",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
          { name: "Aceleracion", allowedInputUnits: ["Aceleracion"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Velocidad",
        handler: (params, uMedida) => {
          return this.CircularSpeed1(params.Velocidad, params.Aceleracion, params.Tiempo, uMedida);
        },
      },
      {
        desc: " v = d / t",
        properties: [
          { name: "Distancia", allowedInputUnits: ["Longitud"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Velocidad",
        handler: (params, uMedida) => {
          return this.CircularSpeed(params.Distancia, params.Tiempo, uMedida);
        },
      },

      // topic:'Tiempo,'
      {
        topic: "Tiempo,",
        desc: "t = d / v",
        properties: [
          { name: "Distancia", allowedInputUnits: ["Longitud"] },
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
        ],
        units: "Tiempo",
        handler: (params, uMedida) => {
          return this.CircularTime(params.Distancia, params.Velocidad, uMedida);
        },
      },
      {
        topic: "Distancia",
        desc: "d = v * t",
        properties: [
          { name: "Velocidad", allowedInputUnits: ["Velocidad"] },
          { name: "Tiempo", allowedInputUnits: ["Tiempo"] },
        ],
        units: "Longitud",
        handler: (params, uMedida) => {
          return this.Distancia(params.Velocidad, params.Tiempo, uMedida);
        },
      },
    ]);
  }

  CircularSpeed(
    distancia: number,
    tiempo: number,
    uMedida: {
      Distancia: typeof InputUnits.Longitud[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Velocidad[number];
    }
  ): number {
    const [uSalidaDistancia, uSalidaTiempo] = uMedida.Salida.split("/"); //Dividimos la unidad de salida de velocidad para saber en que unidades quiere el arco y tiempo en el resultado

    // convertir variables a sus unidades bases
    distancia = this.conversiones.convertirLongitud(distancia, uMedida.Distancia, "M");
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");

    var speed = distancia / tiempo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidad(speed, "M/S", uMedida.Salida);
  }

  // vf = v1 + a * t
  CircularSpeed1(
    initialSpeed: number,
    aceleracion: number,
    tiempo: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad[number];
      Aceleracion: typeof InputUnits.Aceleracion[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Velocidad[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");
    aceleracion = this.conversiones.convertirAceleracion(tiempo, uMedida.Aceleracion, "M/s²");

    const speed = initialSpeed + aceleracion * tiempo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirVelocidad(speed, "M/S", uMedida.Salida);
  }

  // t = d / v;
  CircularTime(
    distancia: number,
    speed: number,
    uMedida: {
      Distancia: typeof InputUnits.Longitud[number];
      Velocidad: typeof InputUnits.Velocidad[number];
      Salida: typeof InputUnits.Tiempo[number];
    }
  ) {
    // convertir variables a sus unidades bases
    distancia = this.conversiones.convertirLongitud(distancia, uMedida.Distancia, "M");
    speed = this.conversiones.convertirVelocidad(distancia, uMedida.Velocidad, "M/S");

    const time = distancia / speed;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirTiempo(time, "s", uMedida.Salida);
  }

  // d = v * t;
  Distancia(
    velocidad: number,
    tiempo: number,
    uMedida: {
      Velocidad: typeof InputUnits.Velocidad[number];
      Tiempo: typeof InputUnits.Tiempo[number];
      Salida: typeof InputUnits.Longitud[number];
    }
  ) {
    // convertir variables a sus unidades bases
    tiempo = this.conversiones.convertirTiempo(tiempo, uMedida.Tiempo, "s");
    velocidad = this.conversiones.convertirVelocidad(velocidad, uMedida.Velocidad, "M/S");

    var distancia = velocidad * tiempo;

    // convertir resultado desde su unidad base a las unidades que quiere el usuario
    return this.conversiones.convertirLongitud(distancia, "M", uMedida.Salida);
  }
}
