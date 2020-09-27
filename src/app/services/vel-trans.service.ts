import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService } from "./conversiones.service";

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
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "M/Segundos Km/Horas Millas/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.CircularSpeed1(params.Velocidad, params.Aceleracion, params.Tiempo, uMedida);
        },
      },
      {
        desc: " v = d / t",
        properties: [
          { name: "Distancia", allowedInputUnits: "Longitud" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "M/Segundos Km/Horas Millas/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.CircularSpeed(params.Distancia, params.Tiempo, uMedida);
        },
      },

      // topic:'Tiempo,'
      {
        topic: "Tiempo,",
        desc: "t = d / v",
        properties: [
          { name: "Distancia", allowedInputUnits: "Longitud" },
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
        ],
        units: "Horas Minutos Segundos",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.CircularTime(params.Distancia, params.Velocidad, uMedida);
        },
      },
      {
        topic: "Distancia",
        desc: "d = v * t",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "M Km Cm",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Distancia(params.Velocidad, params.Tiempo, uMedida);
        },
      },
    ]);
  }

  CircularSpeed(distancia: number, tiempo: number, u?: any): number {
    distancia = this.conversiones.convertirLongitud(distancia, u.Distancia, "M");
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");
    var speed = distancia / tiempo;
    return this.conversiones.convertirVelocidad(speed, u.salida.Distancia, u.salida.Tiempo);
  }

  CircularSpeed1(initialSpeed: number, aceleracion: number, tiempo: number, u?: any): number {
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");
    var speed = initialSpeed + aceleracion * tiempo;
    return this.conversiones.convertirVelocidad(speed, u.salida.Distancia, u.salida.Tiempo);
  }

  CircularTime(distancia: number, speed: number, u?: any) {
    this.conversiones.convertirLongitud(distancia, u.Distancia, u.salida.Distancia);
    var time = distancia / speed;
    return this.conversiones.convertirTiempo(time, u.Tiempo, u.salida.Tiempo);
  }

  Distancia(velocidad: number, tiempo: number, u?: any) {
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");
    velocidad = this.conversiones.Velocidad.Mt_Por_Segundo(velocidad, u.Velocidad);
    var vel = velocidad * tiempo;
    return this.conversiones.convertirVelocidad(vel, u.salida.Distancia, u.salida.Tiempo);
  }
}
