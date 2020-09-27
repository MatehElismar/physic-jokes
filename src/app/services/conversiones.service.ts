import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";

@Injectable({
  providedIn: "root",
})
export class ConversionesService extends SuperTopic {
  Tiempo: Tiempo;
  Longitud: Longitud;
  InputUnits: InputUnits;
  Frecuencia: Frecuencia;
  Velocidad: Velocidad;
  Aceleracion: Aceleracion;

  constructor() {
    super("Conversiones", [
      {
        desc: "Grados a Radianes",
        properties: [{ name: "Grados", allowedInputUnits: "null" }],
        units: "Radianes",
        handler: (params) => {
          return this.GradoARadian(params.Grados);
        },
      },
      {
        desc: "Radianes a Grados",
        properties: [{ name: "Radian", allowedInputUnits: "null" }],
        units: "Grados",
        handler: (params) => {
          return this.RadianAGrado(params.Radian);
        },
      },
      {
        desc: "Revoluciones a Radianes",
        properties: [{ name: "Revolucion", allowedInputUnits: "null" }],
        units: "Radian",
        handler: (params) => {
          return this.Longitud.Angular.RevolucionARadian(params.Revolucion);
        },
      },
      {
        desc: "Radianes a Revoluciones",
        properties: [{ name: "Radian", allowedInputUnits: "null" }],
        units: "Rev",
        handler: (params) => {
          return this.Longitud.Angular.RadianARev(params.Radian);
        },
      },
      {
        desc: "Centimetros a Metros",
        properties: [{ name: "Centimetros", allowedInputUnits: "null" }],
        units: "Metros",
        handler: (params) => {
          return this.Longitud.cm_a_mt(params.Centimetros);
        },
      },
      {
        desc: "Centimetros a Kilometros",
        properties: [{ name: "Centimetros", allowedInputUnits: "null" }],
        units: "Km",
        handler: (params) => {
          return this.Longitud.cm_a_km(params.Centimetros);
        },
      },
    ]);
    this.Tiempo = new Tiempo();
    this.Longitud = new Longitud();
    this.InputUnits = new InputUnits();
    this.Frecuencia = new Frecuencia();
    this.Velocidad = new Velocidad();
    this.Aceleracion = new Aceleracion();

    console.log("Hello ConversionesProvider Provider");
  }

  RadianAGrado(radian: number) {
    // 1 radian = 57.3 grados
    return (radian * 180) / 3.1416;
  }

  GradoARadian(grado: number) {
    return (grado * 3.14) / 180;
  }

  convertirAngulo(angulo, entrada) {
    if (entrada == "Radian") {
      angulo = this.RadianAGrado(angulo);
    } else if (entrada == "Grados") {
      angulo = this.GradoARadian(angulo);
    }

    return angulo;
  }
  // Convierte de units bbase (m/s) a otras units
  convertirAceleracion(aceleracion: number, distancia, tiempo) {
    if ((distancia = "M" && tiempo == "Segundos²")) {
      aceleracion = this.Aceleracion.Mt_Por_Segundo(aceleracion, "M/S²");
    } else if ((distancia = "Km" && tiempo == "Segundos²")) {
      aceleracion = this.Aceleracion.Km_Por_Segundo(aceleracion, "M/S²");
    } else if ((distancia = "Mi" && tiempo == "Segundos²")) {
      aceleracion = this.Aceleracion.Millas_Por_Segundo(aceleracion, "M/S²");
    }

    // ACeleracion Angular
    // 'Rad/s²', 'Rad/m²', 'Rev/s²', 'Rev/m²'

    if ((distancia = "Rad" && tiempo == "Segundos²")) {
      aceleracion = this.Aceleracion.Rad_Por_Segundos(aceleracion, "Rad/S²");
    } else if ((distancia = "Rad" && tiempo == "Minutos²")) {
      aceleracion = this.Aceleracion.Rad_Por_Min(aceleracion, "Rad/S²");
    } else if ((distancia = "Rev" && tiempo == "Segundos²")) {
      aceleracion = this.Aceleracion.Rev_Por_Segundos(aceleracion, "Rad/S²");
    } else if ((distancia = "Rev" && tiempo == "Minutos²")) {
      aceleracion = this.Aceleracion.Rev_Por_Min(aceleracion, "Rad/S²");
    }
    return aceleracion;
  }

  // Convierte desde rad/s A otras units de velocidad angular
  convertirVelocidadAngular(vel: number, arco, tiempo) {
    if (arco == "Rad" && tiempo == "Minutos") {
      vel = this.Velocidad.Rad_Por_Min(vel, "Rad/s");
    } else if (arco == "Rad" && tiempo == "Horas") {
      vel = this.Velocidad.Rad_Por_Hora(vel, "Rad/s");
    }
    if (arco == "Rev" && tiempo == "Minutos") {
      vel = this.Velocidad.Rev_Por_Min(vel, "Rad/s");
    }
    if (arco == "Rev" && tiempo == "Segundos") {
      vel = this.Velocidad.Rev_Por_Segundo(vel, "Rad/s");
    }
    if (arco == "Rev" && tiempo == "Horas") {
      vel = this.Velocidad.Rev_Por_Hora(vel, "Rad/s");
    }

    return vel;
  }

  convertirVelocidad(vel: number, distancia, tiempo) {
    if ((distancia = "Metros" && tiempo == "Segundos")) {
      vel = this.Velocidad.Mt_Por_Segundo(vel, "M/S");
    } else if ((distancia = "Km" && tiempo == "Horas")) {
      vel = this.Velocidad.Km_Por_Hora(vel, "M/S");
    }

    return vel;
  }

  convertirFrecuencia(frecuencia, entrada, salida) {
    console.log("Frecuencia -> Conversion:Entrada ", frecuencia);

    if ((entrada = "Hz" && salida == "RPM")) {
      frecuencia = this.Frecuencia.hz_to_rpm(frecuencia);
    } else if ((entrada = "RPM" && salida == "Hz")) {
      frecuencia = this.Frecuencia.rpm_to_hz(frecuencia);
    }
    console.log("Frecuencia -> Connversion:Salida", frecuencia);

    return frecuencia;
  }

  public convertirTiempo(tiempo, eTiempo, sTiempo) {
    console.log("Conversion:Entrada ", tiempo);
    if (eTiempo == "Horas" && sTiempo == "Minutos") {
      tiempo = this.Tiempo.hh_a_mm(tiempo);
    } else if (eTiempo == "Horas" && sTiempo == "Segundos") {
      tiempo = this.Tiempo.hh_a_ss(tiempo);
    } else if (eTiempo == "Minutos" && sTiempo == "Horas") {
      tiempo = this.Tiempo.mm_a_hh(tiempo);
    } else if (eTiempo == "Minutos" && sTiempo == "Segundos") {
      tiempo = this.Tiempo.mm_a_ss(tiempo);
    } else if (eTiempo == "Segundos" && sTiempo == "Minutos") {
      tiempo = this.Tiempo.ss_a_mm(tiempo);
    } else if (eTiempo == "Segundos" && sTiempo == "Horas") {
      tiempo = this.Tiempo.ss_a_hh(tiempo);
    }
    console.log("Connversion:Salida", tiempo);
    return tiempo;
  }

  public convertirLongitud(longitud: number, entrada, salida) {
    console.log("Longitud -> Conversion:Entrada ", longitud);

    if (entrada == "M" && salida == "Cm") {
      longitud = this.Longitud.mt_a_cm(longitud);
    } else if (entrada == "M" && salida == "Km") {
      longitud = this.Longitud.mt_a_km(longitud);
    } else if (entrada == "Cm" && salida == "M") {
      longitud = this.Longitud.cm_a_mt(longitud);
    } else if (entrada == "Cm" && salida == "Km") {
      longitud = this.Longitud.cm_a_km(longitud);
    } else if (entrada == "Km" && salida == "M") {
      longitud = this.Longitud.km_a_mt(longitud);
    } else if (entrada == "Km" && salida == "Cm") {
      longitud = this.Longitud.km_a_cm(longitud);
    }

    console.log("Longitud -> Connversion:Salida", longitud);

    return longitud;
  }

  convertirArco(arco: number, entrada, salida) {
    console.log("Conversion:Entrada ", arco);
    if (entrada == "Rad" && salida == "Rev") {
      arco = this.Longitud.Angular.RadianARev(arco);
    } else if (entrada == "Rev" && salida == "Rad") {
      arco = this.Longitud.Angular.RevolucionARadian(arco);
    }
    console.log("Connversion:Salida", arco);
    return arco;
  }
}

class Velocidad {
  Tiempo: Tiempo;
  Arco: LongitudAngular;
  Distancia: Longitud;

  constructor() {
    this.Tiempo = new Tiempo();
    this.Arco = new LongitudAngular();
    this.Distancia = new Longitud();
  }

  // conversiones a <> desde <>
  Rad_Por_Segundo(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m") {
      vel = vel * 0.016666666667;
    } else if (entrada == "Rad/h") {
      vel = vel * 0.00027777777778;
    } else if (entrada == "Rev/s") {
      vel = vel * 6.2831853072;
    } else if (entrada == "Rev/m") {
      vel = vel * 0.10471975512;
    } else if (entrada == "Rev/h") {
      vel = vel * 0.001745329252;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Min(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/s") {
      vel = vel * 60;
    } else if (entrada == "Rad/h") {
      vel = vel * 0.016666666667;
    } else if (entrada == "Rev/s") {
      vel = vel * 376.99111843;
    } else if (entrada == "Rev/m") {
      vel = vel * 6.2831853072;
    } else if (entrada == "Rev/h") {
      vel = vel * 0.10471975512;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Hora(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m") {
      vel = vel * 60;
    } else if (entrada == "Rad/s") {
      vel = vel * 3600;
    } else if (entrada == "Rev/s") {
      vel = vel * 22619.467106;
    } else if (entrada == "Rev/m") {
      vel = vel * 376.99111843;
    } else if (entrada == "Rev/h") {
      vel = vel * 6.2831853072;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Segundo(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m") {
      vel = vel * 0.0026525823849;
    } else if (entrada == "Rad/h") {
      vel = vel * 0.000044209706414;
    } else if (entrada == "Rad/s") {
      vel = vel * 0.15915494309;
    } else if (entrada == "Rev/m") {
      vel = vel * 0.016666666667;
    } else if (entrada == "Rev/h") {
      vel = vel * 0.00027777777778;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Min(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/s") {
      vel = vel * 9.5492965855;
    } else if (entrada == "Rad/h") {
      vel = vel * 0.0026525823849;
    } else if (entrada == "Rev/s") {
      vel = vel * 60;
    } else if (entrada == "Rad/m") {
      vel = vel * 0.15915494309;
    } else if (entrada == "Rev/h") {
      vel = vel * 0.016666666667;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Hora(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m") {
      vel = vel * 9.5492965855;
    } else if (entrada == "Rad/s") {
      vel = vel * 572.95779513;
    } else if (entrada == "Rev/s") {
      vel = vel * 3600;
    } else if (entrada == "Rev/m") {
      vel = vel * 60;
    } else if (entrada == "Rad/h") {
      vel = vel * 0.15915494309;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Mt_Por_Segundo(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "MPH") {
      vel = vel * 0.44704;
    } else if (entrada == "KM/H") {
      vel = vel * 0.27777777778;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Km_Por_Hora(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "M/S") {
      vel = vel * 3.6;
    } else if (entrada == "MPH") {
      vel = vel * 1.609344;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  MPH(vel: number, entrada) {
    console.log("Velocidad -> Conversion:Entrada ", vel);

    if (entrada == "M/S") {
      vel = vel * 2.2369362921;
    } else if (entrada == "KM/H") {
      vel = vel * 0.62137119224;
    }
    console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }
}

class Aceleracion {
  //El nombre de los metodos no lo indican, pero las units de aceleracion estan al cuadrado
  // 'M/S²', 'KM/S²', 'Mi/S²'

  //#region   Aceleracion Angular
  Rad_Por_Min(vel: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", vel);

    if (entrada == "Rad/s²") {
      vel = vel * 3600;
    } else if (entrada == "Rev/m²") {
      vel = vel * 6.2831853062;
    } else if (entrada == "Rev/s²") {
      vel = vel * 22619.467102;
    }

    console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Segundos(vel: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m²") {
      vel = vel * 0.00027777777778;
    } else if (entrada == "Rev/m²") {
      vel = vel * 0.0017453292517;
    } else if (entrada == "Rev/s²") {
      vel = vel * 6.2831853062;
    }

    console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Segundos(vel: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m²") {
      vel = vel * 0.000044209706421;
    } else if (entrada == "Rad/s²") {
      vel = vel * 0.15915494312;
    } else if (entrada == "Rev/m²") {
      vel = vel * 0.00027777777778;
    }

    console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Min(vel: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", vel);

    if (entrada == "Rad/m²") {
      vel = vel * 0.15915494312;
    } else if (entrada == "Rad/s²") {
      vel = vel * 572.95779522;
    } else if (entrada == "Rev/s²") {
      vel = vel * 3600;
    }

    console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }
  //#endregion
  // conversiones a <> desde <>

  Mt_Por_Segundo(aceleracion: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", aceleracion);

    if (entrada == "KM/S²") {
      aceleracion = aceleracion * 1000;
    } else if (entrada == "Mi/S²") {
      aceleracion = aceleracion * 1609.344;
    }

    console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }

  Millas_Por_Segundo(aceleracion: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", aceleracion);

    if (entrada == "KM/S²") {
      aceleracion = aceleracion * 0.62137119224;
    } else if (entrada == "M/S²") {
      aceleracion = aceleracion * 0.00062137119224;
    }

    console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }

  Km_Por_Segundo(aceleracion: number, entrada) {
    console.log("Aceleracion -> Conversion:Entrada ", aceleracion);

    if (entrada == "M/S²") {
      aceleracion = aceleracion * 0.001;
    } else if (entrada == "Mi/S²") {
      aceleracion = aceleracion * 1.609344;
    }

    console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }
}

class Tiempo {
  hh_a_mm(hh: number) {
    // 1 hh = 60mm
    return hh * 60;
  }

  hh_a_ss(hh: number) {
    // 1 hh = 3600 ss
    return hh * 3600;
  }

  mm_a_ss(mm: number) {
    // 1 mm = 60 ss
    return mm * 60;
  }

  mm_a_hh(mm: number) {
    // 1 mm = 1mm * 1 / 60
    return mm / 60;
  }

  ss_a_mm(ss: number) {
    // 1 ss = 1ss * 1 / 60
    return ss / 60;
  }

  ss_a_hh(ss: number) {
    // 1 ss = 1ss * 1 / 3600
    return ss / 3600;
  }
}

class Longitud {
  Angular: LongitudAngular;

  constructor() {
    this.Angular = new LongitudAngular();
  }

  cm_a_mt(cm: number) {
    // 1 me = 100cm
    return cm / 100;
  }

  cm_a_km(cm: number) {
    // 1 me = 100cm
    return cm / 100000;
  }

  km_a_mt(km: number) {
    return km / 1000;
  }

  km_a_cm(km: number) {
    return km * 100000;
  }

  mt_a_cm(mt: number) {
    return mt * 100;
  }

  mt_a_km(mt: number) {
    return mt * 1000;
  }
}

class Frecuencia {
  rpm_to_hz(rpm: number) {
    return rpm * 0.0166666667;
  }

  hz_to_rpm(hz: number) {
    return hz / 0.0166666667;
  }
}

class LongitudAngular {
  RevolucionARadian(rev: number) {
    return rev * 2 * 3.1416;
  }

  RadianARev(rad: number) {
    return rad / (2 * 3.1416);
  }
}

class InputUnits {
  Inercia: string[];
  Peso: string[];
  Angulo: string[];
  Arco: string[];
  Velocidad: string[];
  Velocidad_Angular: string[];
  Tiempo: string[];
  Aceleracion: string[];
  Aceleracion_Angular: string[];
  Longitud: string[];
  Fuerza: string[];
  Frecuencia: string[];
  none: string[];
  null: string[];
  Torque: string[];
  Potencia: string[];
  Trabajo: string[];
  Componentes: string[];

  constructor() {
    this.null = []; //No tiene units
    this.none = ["Constante"]; //Es una constante, su valor es fijo, no lo decide el usuario
    this.Angulo = ["Grados", "Radian"];
    this.Arco = ["Rad", "Rev"];
    this.Velocidad = ["M/S", "MPH", "KM/H"];
    this.Velocidad_Angular = ["Rad/s", "Rad/m", "Rad/h", "Rev/s", "Rev/m", "Rev/h"];
    this.Tiempo = ["Segundos", "Minutos", "Horas"];
    this.Aceleracion = ["M/S²", "KM/S²", "Mi/S²"];
    this.Aceleracion_Angular = ["Rad/s²", "Rad/m²", "Rev/s²", "Rev/m²"];
    this.Longitud = ["Cm", "M", "Km"];
    this.Fuerza = ["N"]; //Newton
    this.Frecuencia = ["Hz", "RPM", "RPS"];
    this.Peso = ["Kg"];
    this.Inercia = ["Kg*m²"];
    this.Torque = ["N*M"];
    this.Potencia = ["Watt"];
    this.Trabajo = ["Julios"];
    this.Componentes = ["J", "K", "I"];
  }
}
