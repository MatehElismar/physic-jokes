import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService } from "./conversiones.service";

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
            allowedInputUnits: "Tiempo",
          },
          {
            name: "PI",
            allowedInputUnits: "none",
          },
        ],

        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };
          return this.CircularSpeed2(params.Periodo, uMedida);
        },
      },
      {
        desc: " ω = ωﺃ + α * t",
        properties: [
          { name: "Velocidad_Inicial", allowedInputUnits: "Velocidad_Angular" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion_Angular" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.CircularSpeed1(params.Velocidad_Inicial, params.Aceleracion, params.Tiempo, uMedida);
        },
      },
      {
        desc: " ω = Ɵ / t",
        properties: [
          { name: "Arco", allowedInputUnits: "Arco" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.CircularSpeed(params.Arco, params.Tiempo, uMedida);
        },
      },
      {
        desc: "ω = 2π * f",
        properties: [
          { name: "PI", allowedInputUnits: "none" },
          { name: "Frecuencia", allowedInputUnits: "Frecuencia" },
        ],
        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.CircularSpeed3(params.Frecuencia, uMedida);
        },
      },
      {
        desc: "ω = Vt / r",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
          { name: "Radio", allowedInputUnits: "Longitud" },
        ],
        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.CircularSpeed4(params.Velocidad, params.Radio, uMedida);
        },
      },
      {
        desc: "ω = P / τ",
        properties: [
          { name: "Potencia", allowedInputUnits: "Potencia" },
          { name: "Torque", allowedInputUnits: "Torque" },
        ],
        units: "Rad/Segundos Rad/Minutos Rad/Horas Rev/Segundos Rev/Minutos Rev/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.CircularSpeed5(params.Potencia, params.Torque, uMedida);
        },
      },
      //#endregion
      //#region Velocidad Tangencial
      {
        topic: "Velocidad Tangencial",
        desc: "Vt = 2π * r / T",
        properties: [
          { name: "PI", allowedInputUnits: "none" },
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Periodo", allowedInputUnits: "Tiempo" },
        ],
        units: "M/Segundos Km/Horas Millas/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.VelocidadTangencial(params.Radio, params.Periodo, uMedida);
        },
      },
      {
        desc: "Vt = 2π * r * f",
        properties: [
          { name: "PI", allowedInputUnits: "none" },
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Frecuencia", allowedInputUnits: "Frecuencia" },
        ],
        units: "M/Segundos Km/Horas Millas/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.VelocidadTangencial_1(params.Radio, params.Frecuencia, uMedida);
        },
      },
      {
        desc: "Vt = ω * r",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
          { name: "Radio", allowedInputUnits: "Longitud" },
        ],
        units: "M/Segundos Km/Horas Millas/Horas",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.VelocidadTangencial_2(params.Velocidad, params.Radio, uMedida);
        },
      },
      //#endregion
      //#region Aceleracion Angular
      {
        topic: "Aceleracion Angular",
        desc: "α = ωf - ωﺃ / t",
        properties: [
          { name: "Velocidad_Inicial", allowedInputUnits: "Velocidad_Angular" },
          { name: "Velocidad_Final", allowedInputUnits: "Velocidad_Angular" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Rad/Segundos² Rad/Minutos² Rev/Segundos² Rev/Minutos²",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.Aceleracion(params.Velocidad_Final, params.Velocidad_Inicial, params.Tiempo, uMedida);
        },
      },
      {
        desc: "α = ω / t",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Rad/Segundos² Rad/Minutos² Rev/Segundos² Rev/Minutos²",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.Aceleracion3(params.Velocidad, params.Tiempo, uMedida);
        },
      },
      {
        desc: "α = At / r",
        properties: [
          { name: "Aceleracion", allowedInputUnits: "Aceleracion" },
          { name: "Radio", allowedInputUnits: "Longitud" },
        ],
        units: "Rad/Segundos² Rad/Minutos² Rev/Segundos² Rev/Minutos²",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Arco: u[0], Tiempo: u[1] };

          return this.Aceleracion2(params.Aceleracion, params.Radio, uMedida);
        },
      },
      //#endregion
      //#region Aceleracion TAngencial
      {
        topic: "Aceleracion Tangencial",
        desc: "At = r * α",
        properties: [
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion_Angular" },
        ],
        units: "M/Segundos² Km/Segundos² Mi/Segundos²",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.AceleracionTangencial(params.Radio, params.Aceleracion, uMedida);
        },
      },
      {
        desc: "At = Ft / M", //Fuerza tangencial entre la masa
        properties: [
          { name: "Fuerza", allowedInputUnits: "Fuerza" },
          { name: "Masa", allowedInputUnits: "Peso" },
        ],
        units: "M/Segundos² Km/Segundos² Mi/Segundos²",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("/");
          uMedida.salida = { Distancia: u[0], Tiempo: u[1] };

          return this.AceleracionTangencial2(params.Fuerza, params.Masa, uMedida);
        },
      },
      //#endregion
      //#region tiempo
      {
        topic: "Tiempo",
        desc: "t = Ɵ / ω",
        properties: [
          { name: "Arco", allowedInputUnits: "Arco" },
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
        ],
        units: "Segundos Minutos Horas",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.CircularTime(params.Arco, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region Frecuencia
      {
        topic: "Frecuencia",
        desc: " f = 1 / T",
        properties: [{ name: "Periodo", allowedInputUnits: "Tiempo" }],
        units: "Hz RPM RPS",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Frecuencia(params.Periodo, uMedida);
        },
      },
      {
        desc: " f = Vt / 2π * r",
        properties: [
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
        ],
        units: "Hz RPM RPS",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Frecuencia1(params.Radio, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region periodo
      {
        topic: "Periodo",
        desc: " T = 1 / f",
        properties: [{ name: "Frecuencia", allowedInputUnits: "Frecuencia" }],
        units: "Segundos Minutos Horas",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Periodo(params.Frecuencia, uMedida);
        },
      },
      {
        desc: " T = 2π / ω",
        properties: [{ name: "Velocidad", allowedInputUnits: "Velocidad_Angular" }],
        units: "Segundos Horas Minutos ",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Periodo2(params.Velocidad, uMedida);
        },
      },
      {
        desc: " T = 2π * r / Vt",
        properties: [
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Velocidad", allowedInputUnits: "Velocidad" },
        ],
        units: "Segundos Horas Minutos ",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Periodo1(params.Radio, params.Velocidad, uMedida);
        },
      },
      //#endregion
      //#region Desplazamiento
      {
        topic: "Desplazamiento Angular",
        desc: "Ɵ = ω * t",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Rad Rev",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.ArcoRecorrido(params.Velocidad, params.Tiempo, uMedida);
        },
      },
      {
        desc: "Ɵf = Ɵ1 + (ω * t) + 1/2 (α * t²)",
        properties: [
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
          { name: "Arco_Inicial", allowedInputUnits: "Arco" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion_Angular" },
        ],
        units: "Rad Rev",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.ArcoRecorrido2(params.Velocidad, params.Arco_Inicial, params.Tiempo, params.Aceleracion, uMedida);
        },
      },
      //#endregion
    ]);
  }

  //#region Aceleracion
  Aceleracion(velF: number, velI: number, tiempo: number, u?: any) {
    // α = ωf - ωﺃ / t
    velF = this.conversiones.Velocidad.Rad_Por_Segundo(velF, u.Velocidad_Final);
    velI = this.conversiones.Velocidad.Rad_Por_Segundo(velI, u.Velocidad_Inicial);
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");

    var aceleracion = (velF - velI) / tiempo; //rad/seg
    return this.conversiones.convertirAceleracion(aceleracion, u.salida.Distancia, u.salida.Tiempo);
  }

  Aceleracion2(Aceleracion: number, Radio: number, u?: any) {
    // α = At / r
    Aceleracion = this.conversiones.Aceleracion.Rad_Por_Segundos(Aceleracion, u.Velocidad_Final);
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");

    var aceleracion = Aceleracion / Radio; //rad/seg
    return this.conversiones.convertirAceleracion(aceleracion, u.salida.Distancia, u.salida.Tiempo);
  }

  Aceleracion3(velocidad: number, tiempo: number, u?: any) {
    // α = velocidad / t
    velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(velocidad, u.Velocidad);
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");
    var aceleracion = velocidad / tiempo; //rad/seg

    return this.conversiones.convertirAceleracion(aceleracion, u.salida.Distancia, u.salida.Tiempo);
  }

  AceleracionTangencial(Radio: number, Velocidad: number, u?: any) {
    // At = r * α

    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);

    var aceleracion = Radio * Velocidad; //Metros/Segundos
    return this.conversiones.convertirAceleracion(aceleracion, u.salida.Distancia, u.salida.Tiempo);
  }

  AceleracionTangencial2(Fuerza: number, Masa: number, u?: any) {
    // At = Ft / m

    var Aceleracion = Fuerza / Masa;
    return this.conversiones.convertirAceleracion(Aceleracion, u.salida.distancia, u.salida.tiempo);
  }

  //#endregion

  // \parametros: tiempo, unidad de entrada, unidad de salida
  //#region Velociad
  CircularSpeed(Arco: number, tiempo: number, u?: any): number {
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, u.salida.Tiempo);

    Arco = this.conversiones.convertirArco(Arco, u.Arco, u.salida.Arco);

    var speed = Arco / tiempo;
    return this.conversiones.convertirVelocidadAngular(speed, u.salida.Arco, u.salida.Tiempo);
  }

  // Velocidad
  CircularSpeed1(initialSpeed: number, aceleracion: number, tiempo: number, u?: any): number {
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, u.salida.Tiempo);
    return initialSpeed + aceleracion * tiempo;
  }

  CircularSpeed2(Periodo: number, u?: any) {
    // El periodo viene en units de tiempo
    Periodo = this.conversiones.convertirTiempo(Periodo, u.Periodo, "Segundos");

    var speed = (2 * 3.1416) / Periodo;
    return this.conversiones.convertirVelocidadAngular(speed, u.salida.Arco, u.salida.Tiempo);
  }

  CircularSpeed3(Frecuencia: number, u?: any) {
    //la unidad de medida de la frecuencia es el Herz
    Frecuencia = this.conversiones.convertirFrecuencia(Frecuencia, u.Frecuencia, "Hz");

    var speed = 2 * 3.1416 * Frecuencia;
    return this.conversiones.convertirVelocidadAngular(speed, u.salida.Arco, u.salida.Tiempo);
  }

  CircularSpeed4(Velocidad: number, Radio: number, u?: any) {
    // ω = Vt / r
    Velocidad = this.conversiones.Velocidad.Mt_Por_Segundo(Velocidad, u.Velocidad);
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");

    var speed = Velocidad / Radio;

    return this.conversiones.convertirVelocidadAngular(speed, u.salida.Arco, u.salida.Tiempo);
  }

  CircularSpeed5(Potencia: number, Torque: number, u?: any) {
    // ω = potencia / torque

    // No hay conversiones porque estas solo tienen units bae
    var speed = Potencia / Torque;

    return this.conversiones.convertirVelocidadAngular(speed, u.salida.Arco, u.salida.Tiempo);
  }

  CircularTime(Arco: number, speed: number, u?: any) {
    Arco = this.conversiones.convertirArco(Arco, u.Arco, "Rad");

    speed = this.conversiones.Velocidad.Rad_Por_Segundo(speed, u.Velocidad);

    var time = Arco / speed;
    return this.conversiones.convertirTiempo(time, "Segundos", u.salida.Tiempo);
  }

  ArcoRecorrido(velocidad: number, tiempo: number, u?: any) {
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");

    velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(velocidad, u.Velocidad);

    var Arco = velocidad * tiempo; //en radianes

    return this.conversiones.convertirArco(Arco, "Rad", u.salida);
  }

  ArcoRecorrido2(Velocidad: number, Arco_Inicial: number, Tiempo: number, Aceleracion: number, u?: any) {
    // Ɵf = Ɵ1 + (ω * t) + 1/2 (α * t²)

    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);
    Tiempo = this.conversiones.convertirTiempo(Tiempo, u.Tiempo, "Segundos");
    Arco_Inicial = this.conversiones.convertirArco(Arco_Inicial, u.Arco, "Rad");
    // Aceleracion = this.conversiones.Aceleracion.Rad_Por_Segundo(Aceleracion, u.Aceleracion)

    var arco = Arco_Inicial + Velocidad * Tiempo + (1 / 2) * (Aceleracion * Math.pow(Tiempo, 2));
    return this.conversiones.convertirArco(arco, "Rad", u.salida);
  }

  Periodo(Frecuencia: number, u?: any) {
    Frecuencia = this.conversiones.convertirFrecuencia(Frecuencia, u.Frecuencia, "Hz");

    var periodo = 1 / Frecuencia;
    return this.conversiones.convertirTiempo(periodo, "Segundos", u.salida.Periodo);
  }

  Periodo1(Radio: number, Velocidad: number, u?) {
    // T = 2π * r / Vt
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");

    Velocidad = this.conversiones.Velocidad.Mt_Por_Segundo(Velocidad, u.Velocidad);

    var periodo = (2 * 3.1416 * Radio) / Velocidad;

    return this.conversiones.convertirTiempo(periodo, "Segundos", u.salida);
  }

  Periodo2(Velocidad: number, u?: any) {
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);

    var periodo = (2 * 3.1416) / Velocidad;
    return this.conversiones.convertirTiempo(periodo, "Segundos", u.salida.Periodo);
  }

  Frecuencia(Periodo: number, u?: any) {
    // el periodo viene en units de tiempo, por lo que lo convertimos a segundos, que es su unidad oficial, antes de calcular el resltado
    Periodo = this.conversiones.convertirTiempo(Periodo, u.Periodo, "Segundos");

    var frecuencia = 1 / Periodo;
    return this.conversiones.convertirFrecuencia(frecuencia, "Hz", u.salida.Frecuencia);
  }

  Frecuencia1(Radio: number, Velocidad: number, u?) {
    // Vt / 2π * r
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");

    Velocidad = this.conversiones.Velocidad.Mt_Por_Segundo(Velocidad, u.Velocidad);

    var Frecuencia = Velocidad / (2 * 3.1416 * Radio);

    return this.conversiones.convertirTiempo(Frecuencia, "Hz", u.salida);
  }

  VelocidadTangencial(Radio: number, Periodo: number, u?: any) {
    // Vt = 2π * r / T
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");
    Periodo = this.conversiones.convertirTiempo(Periodo, u.Periodo, "Segundos");

    var vel = (2 * 3.1416 * Radio) / Periodo;
    return this.conversiones.convertirVelocidad(vel, u.salida.Distancia, u.salida.Tiempo);
  }

  VelocidadTangencial_1(Radio: number, Frecuencia: number, u?: any) {
    // 'Vt = 2π * r * f
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");
    Frecuencia = this.conversiones.convertirTiempo(Frecuencia, u.Frecuencia, "Hz");

    var vel = 2 * 3.1416 * Radio * Frecuencia;
    return this.conversiones.convertirVelocidad(vel, u.salida.Distancia, u.salida.Tiempo);
  }

  VelocidadTangencial_2(Velocidad: number, Radio: number, u?: any) {
    // ''Vt = ω * r
    Radio = this.conversiones.convertirLongitud(Radio, u.Radio, "M");

    // Cpnvertimos a units base de velocidad angulr( rad/seg )
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);
    var vel = Velocidad * Radio;
    return this.conversiones.convertirVelocidad(vel, u.salida.Distancia, u.salida.Tiempo);
  }
  //#endregion
}
