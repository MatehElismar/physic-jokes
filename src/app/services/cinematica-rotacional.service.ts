import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";
import { ConversionesService } from "./conversiones.service";

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
          { name: "Fuerza", allowedInputUnits: "Fuerza" },
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Angulo", allowedInputUnits: "Angulo" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Radio: u[1] };
          uMedida.salida = unidadSalida;
          return this.MomentoDeTorcion(params.Fuerza, params.Radio, params.Angulo, uMedida);
        },
      },
      {
        desc: "τ = F * d",
        properties: [
          { name: "Fuerza", allowedInputUnits: "Fuerza" },
          { name: "Palanca", allowedInputUnits: "Longitud" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Palanca: u[1] };
          uMedida.salida = unidadSalida;
          return this.MomentoDeTorcion2(params.Fuerza, params.Palanca, uMedida);
        },
      },
      {
        desc: "τ = I * ω",
        properties: [
          { name: "Inercia", allowedInputUnits: "Inercia" },
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Palanca: u[1] };
          uMedida.salida = unidadSalida;
          return this.MomentoDeTorcion3(params.Inercia, params.Velocidad, uMedida);
        },
      },
      {
        desc: "∑τ = I * α",
        properties: [
          { name: "Inercia", allowedInputUnits: "Inercia" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion_Angular" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Palanca: u[1] };
          uMedida.salida = unidadSalida;
          return this.TorqueNeto(params.Inercia, params.Aceleracion, uMedida);
        },
      },
      {
        desc: "τ = P /  ω",
        properties: [
          { name: "Potencia", allowedInputUnits: "Potencia" },
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Palanca: u[1] };
          uMedida.salida = unidadSalida;
          return this.MomentoDeTorcion4(params.Potencia, params.Velocidad, uMedida);
        },
      },
      {
        desc: "τ = Vector del radio *  Vector de la fuerza",
        properties: [
          { name: "Radio: Valor1", allowedInputUnits: "Componentes" },
          { name: "Radio: Valor2", allowedInputUnits: "Componentes" },
          { name: "Fuerza: Valor1", allowedInputUnits: "Componentes" },
          { name: "Fuerza: Valor2", allowedInputUnits: "Componentes" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Palanca: u[1] };
          uMedida.salida = unidadSalida;
          return this.MomentoDeTorcion5(params.Valor1, params.Valor2, uMedida);
        },
        //J K I
        validateUnits: (input1: any, input2: any) => {
          var allow = input1.units;
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
          { name: "Radio", allowedInputUnits: "Longitud" },
          { name: "Angulo", allowedInputUnits: "Angulo" },
        ],
        units: "Cm Metros Km",
        handler: (params, uMedida, unidadSalida) => {
          // var u = unidadSalida.split('/')
          // uMedida.salida = { Distancia: u[0], Tiempo: u[1] }
          uMedida.salida = unidadSalida;
          return this.PalancaDeTorcion(params.Radio, params.Angulo, uMedida);
        },
      },
      //#endregion

      //#region Momento de inercia
      {
        topic: " Momento de inercia",
        desc: "I = m * r²",
        properties: [
          { name: "Masa", allowedInputUnits: "Peso" },
          { name: "Radio", allowedInputUnits: "Longitud" },
        ],
        units: "N*M",
        handler: (params, uMedida, unidadSalida) => {
          var u = unidadSalida.split("*");
          uMedida.salida = { Fuerza: u[0], Radio: u[1] };
          uMedida.salida = unidadSalida;
          return this.Inercia(params.Masa, params.Radio, uMedida);
        },
      },
      {
        desc: "I = ∑τ / α",
        properties: [
          { name: "Torque_Neto", allowedInputUnits: "null" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion_Angular" },
        ],
        units: "Watts",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Inercia2(params.Torque_Neto, params.Aceleracion, uMedida);
        },
      },
      //#endregion

      //#region POTENCIA
      {
        topic: "Potencia",
        desc: "P = τ * ω",
        properties: [
          { name: "Torque", allowedInputUnits: "Torque" },
          { name: "Velocidad", allowedInputUnits: "Velocidad_Angular" },
        ],
        units: "Watts",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Potencia(params.Torque, params.Velocidad, uMedida);
        },
      },
      {
        desc: "P = W / t",
        properties: [
          { name: "Trabajo", allowedInputUnits: "Trabajo" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
        ],
        units: "Watts",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Potencia2(params.Trabajo, params.Tiempo, uMedida);
        },
      },
      //#endregion

      //#region Trabajo
      {
        topic: "Trabajo",
        desc: "W = (1/2 * I * Wf²)  -  (1/2 * I * Wi²)",
        properties: [
          { name: "Trabajo_Inicial", allowedInputUnits: "Trabajo" },
          { name: "Trabajo_Final", allowedInputUnits: "Trabajo" },
          { name: "Inercia", allowedInputUnits: "Inercia" },
        ],
        units: "Julios",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Trabajo(params.Inercia, params.Trabajo_Inicial, params.Trabajo, uMedida);
        },
      },
      {
        desc: "W = P / t",
        properties: [
          { name: "Potencia", allowedInputUnits: "Potencia" },
          { name: "Tiempo", allowedInputUnits: "Tiempo" },
          { name: "Inercia", allowedInputUnits: "Inercia" },
        ],
        units: "Julios",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Trabajo2(params.Potencia, params.Tiempo, uMedida);
        },
      },
      {
        desc: "W = M * G * H",
        properties: [
          { name: "Masa", allowedInputUnits: "Peso" },
          { name: "Gravedad", allowedInputUnits: "none" },
          { name: "Altura", allowedInputUnits: "Longitud" },
        ],
        units: "Julios",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Trabajo3(params.Masa, params.Altura, uMedida);
        },
      },
      //#endregion

      //#region Fuerza Tangencial
      {
        topic: "Fuerza Tangencial",
        desc: "Ft = At / M",
        properties: [
          { name: "Aceleracion", allowedInputUnits: "Aceleracion" },
          { name: "Masa", allowedInputUnits: "Peso" },
        ],
        units: "N",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.FuerzaTangencial(params.Aceleracion, params.Masa, uMedida);
        },
      },
      //#endregion

      //#region Masa
      {
        topic: "Masa",
        desc: "M = Ft / At",
        properties: [
          { name: "Fuerza", allowedInputUnits: "Fuerza" },
          { name: "Aceleracion", allowedInputUnits: "Aceleracion" },
        ],
        units: "Kg",
        handler: (params, uMedida, unidadSalida) => {
          uMedida.salida = unidadSalida;
          return this.Masa(params.Fuerza, params.Aceleracion, uMedida);
        },
      },
      //#endregion
    ]);
  }

  Trabajo(Inercia: number, wInicial: number, wFinal: number, u: any) {
    // trabajo 1/2 I Wf^2  -  1/2 I Wi^2

    var trabajo = 0.5 * Inercia * Math.pow(wFinal, 2) - 0.5 * Inercia * Math.pow(wInicial, 2);

    return trabajo;
  }

  Trabajo2(potencia: number, tiempo: number, u: any) {
    //W = P / t

    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");

    var trabajo = potencia / tiempo;

    return trabajo;
  }

  Trabajo3(masa: number, altura: number, u: any) {
    //W = masa * gravedad * altura;

    altura = this.conversiones.convertirLongitud(altura, u.Altura, "M");

    var trabajo = masa * 9.8 * altura;

    return trabajo;
  }

  FuerzaTangencial(Aceleracion: number, masa: number, u: any) {
    // Ft = At / M
    Aceleracion = this.conversiones.Aceleracion.Mt_Por_Segundo(Aceleracion, u.Aceleracion);
    var fuerza = Aceleracion / masa;

    return fuerza;
  }

  Masa(fuerza: number, Aceleracion: number, u: any) {
    // M = Ft/ At
    Aceleracion = this.conversiones.Aceleracion.Mt_Por_Segundo(Aceleracion, u.Aceleracion);
    var masa = fuerza / Aceleracion;

    return masa;
  }

  MomentoDeTorcion(fuerza: number, radio: number, angulo: number, uMedida: any) {
    // τ = r * F * sen Ѳ
    angulo = this.conversiones.convertirAngulo(angulo, uMedida.Angulo);
    radio = this.conversiones.convertirLongitud(radio, uMedida.Radio, "M");
    var seno = Math.sin(angulo);
    console.log("seno", seno);
    return radio * fuerza * seno;
  }

  MomentoDeTorcion2(fuerza: number, Palanca: number, uMedida: any) {
    Palanca = this.conversiones.convertirLongitud(Palanca, uMedida.Palanca, "M");
    return fuerza * Palanca;
  }

  MomentoDeTorcion3(Inercia: number, Velocidad: number, u?) {
    // τ = I * ω
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);

    var torque = Inercia * Velocidad;
    return torque;
  }

  MomentoDeTorcion4(Potencia: number, Velocidad: number, u?) {
    // τ = P / ω
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);

    var torque = Potencia / Velocidad;
    return torque;
  }

  MomentoDeTorcion5(Radio: any, Fuerza: any, u?) {
    // τ = P / ω
    return 0;
  }

  TorqueNeto(Inercia: number, Aceleracion: number, u?) {
    // ∑τ = I * α
    Aceleracion = this.conversiones.Aceleracion.Rad_Por_Segundos(Aceleracion, u.Aceleracion);

    var torque = Inercia * Aceleracion;
    return torque;
  }

  Inercia(masa: number, Radio: number, uMedida: any) {
    // I = m * r²
    Radio = this.conversiones.convertirLongitud(Radio, uMedida.Radio, "M");
    var inercia = masa * Math.pow(Radio, 2);
    return inercia;
  }

  Inercia2(TorqueNeto: number, Aceleracion: number, u?: any) {
    // I = ∑τ / α

    Aceleracion = this.conversiones.Aceleracion.Rad_Por_Segundos(Aceleracion, u.Aceleracion);

    var inercia = TorqueNeto / Aceleracion;
    return inercia;
  }

  PalancaDeTorcion(radio: number, angulo: number, u: any) {
    angulo = this.conversiones.convertirAngulo(angulo, u.Angulo);
    radio = this.conversiones.convertirLongitud(radio, u.Radio, "M");
    var seno = Math.sin(angulo);
    var palanca = radio * seno;

    return this.conversiones.convertirLongitud(palanca, "M", u.salida);
  }

  Potencia(Torque: number, Velocidad: number, u?) {
    //P = τ * ω
    Velocidad = this.conversiones.Velocidad.Rad_Por_Segundo(Velocidad, u.Velocidad);

    var potencia = Torque * Velocidad;
    return potencia;
  }

  Potencia2(trabajo: number, tiempo: number, u?) {
    //P = W / t
    tiempo = this.conversiones.convertirTiempo(tiempo, u.Tiempo, "Segundos");

    var potencia = trabajo / tiempo;
    return potencia;
  }
}
