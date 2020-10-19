import { Injectable } from "@angular/core";
import { SuperTopic } from "../models/topics.model";

// defines what exactly is th unit used for.
export class InputUnits {
  static null = [""] as const; //No tiene units
  static none = ["Constante"] as const; //Es una constante, su valor es fijo, no lo decide el usuario
  static Angulo = ["Grados", "Radian"] as const;
  static Arco = ["Rad", "Rev"] as const;
  static Velocidad = ["M/S", "MPH", "KM/H"] as const;
  static Velocidad_Angular = ["Rad/s", "Rad/m", "Rad/h", "Rev/s", "Rev/m", "Rev/h"] as const;
  static Tiempo = ["s", "min", "h"] as const;
  static TiempoInteres = ["Dias", "Meses", "Trimestres", "Anos"] as const;
  static Aceleracion = ["M/s²", "KM/s²", "Mi/s²"] as const;
  static Aceleracion_Angular = ["Rad/s²", "Rad/m²", "Rev/s²", "Rev/m²"] as const;
  static Longitud = ["Cm", "M", "Km", "Mi"] as const;
  static Fuerza = ["N"] as const; //Newton
  static Frecuencia = ["Hz", "RPM", "RPS"] as const;
  static Peso = ["Kg"] as const;
  static Inercia = ["Kg*m²"] as const;
  static Potencia = ["Watt"] as const;
  static Trabajo = ["Julios"] as const;
  static Componentes = ["J", "K", "I"] as const;
  static MomentoDeTorcion = ["N*M"] as const;
  static TasaDeInteres = ["Anual", "Trimestral", "Mensual", "Diaria"] as const;
  static Dinero = ["RD$" /* , "USD$" */] as const;
}
export type PhysicVariable = keyof typeof InputUnits;

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
        desc: "Angulos",
        properties: [{ name: "Grados", allowedInputUnits: ["Angulo"] }],
        units: "Angulo",
        handler: (params) => {
          return this.GradoARadian(params.Grados);
        },
      },
      {
        desc: "Arcos",
        properties: [{ name: "Radian", allowedInputUnits: ["Arco"] }],
        units: "Arco",
        handler: (params) => {
          return this.RadianAGrado(params.Radian);
        },
      },
      {
        desc: "Longitudes",
        properties: [{ name: "Centimetros", allowedInputUnits: ["Longitud"] }],
        units: "Longitud",
        handler: (params) => {
          return this.Longitud.cm_a_mt(params.Centimetros);
        },
      },
    ]);
    this.Tiempo = new Tiempo();
    this.Longitud = new Longitud();
    this.Frecuencia = new Frecuencia();
    this.Velocidad = new Velocidad();
    this.Aceleracion = new Aceleracion();

    //console.log("Hello ConversionesProvider Provider");
  }

  RadianAGrado(radian: number) {
    // 1 radian = 57.3 grados
    return (radian * 180) / 3.1416;
  }

  GradoARadian(grado: number) {
    return (grado * 3.14) / 180;
  }

  convertirTasaDeInteres(
    I: number,
    from: typeof InputUnits.TasaDeInteres[number],
    to: typeof InputUnits.TasaDeInteres[number]
  ) {
    if (from == "Anual" && to == "Mensual") return I / 12;
    else if (from == "Anual" && to == "Diaria") return I / 360;
    else if (from == "Anual" && to == "Trimestral") return I / 4;
    else if (from == "Mensual" && to == "Anual") return I * 12;
    else if (from == "Mensual" && to == "Diaria") return I / 30;
    else if (from == "Mensual" && to == "Trimestral") return I * 3;
    else if (from == "Diaria" && to == "Mensual") return I * 30;
    else if (from == "Diaria" && to == "Anual") return I * 360;
    else if (from == "Diaria" && to == "Trimestral") return I * 90;
    else return I;
  }

  convertirAngulo(angulo: number, from: typeof InputUnits.Angulo[number]) {
    if (from == "Radian") {
      angulo = this.RadianAGrado(angulo);
    } else if (from == "Grados") {
      angulo = this.GradoARadian(angulo);
    }

    return angulo;
  }
  // Convierte de units bbase (m/s) a otras units
  convertirAceleracion(
    aceleracion: number,
    from: typeof InputUnits.Aceleracion[number] | typeof InputUnits.Aceleracion_Angular[number],
    to: typeof InputUnits.Aceleracion[number] | typeof InputUnits.Aceleracion_Angular[number]
  ) {
    if (to == "M/s²")
      aceleracion = this.Aceleracion.Mt_Por_Segundo(aceleracion, from as typeof InputUnits.Aceleracion[number]);
    else if (to == "KM/s²")
      aceleracion = this.Aceleracion.Km_Por_Segundos(aceleracion, from as typeof InputUnits.Aceleracion[number]);
    else if (to == "Mi/s²")
      aceleracion = this.Aceleracion.Millas_Por_Segundos(aceleracion, from as typeof InputUnits.Aceleracion[number]);
    // ACeleracion Angular
    // 'Rad/s²', 'Rad/m²', 'Rev/s²', 'Rev/m²'
    else if (to == "Rad/s²")
      aceleracion = this.Aceleracion.Rad_Por_Segundo(
        aceleracion,
        from as typeof InputUnits.Aceleracion_Angular[number]
      );
    else if (to == "Rad/m²")
      aceleracion = this.Aceleracion.Rad_Por_Min(aceleracion, from as typeof InputUnits.Aceleracion_Angular[number]);
    else if (to == "Rev/s²")
      aceleracion = this.Aceleracion.Rev_Por_Segundos(
        aceleracion,
        from as typeof InputUnits.Aceleracion_Angular[number]
      );
    else if (to == "Rev/m²")
      aceleracion = this.Aceleracion.Rev_Por_Min(aceleracion, from as typeof InputUnits.Aceleracion_Angular[number]);

    return aceleracion;
  }

  // Convierte desde rad/s A otras units de velocidad angular
  convertirVelocidadAngular(
    vel: number,
    from: typeof InputUnits.Velocidad_Angular[number],
    to: typeof InputUnits.Velocidad_Angular[number]
  ) {
    if (to == "Rad/s") vel = this.Velocidad.Rad_Por_Segundo(vel, from);
    else if (to == "Rad/m") vel = this.Velocidad.Rad_Por_Min(vel, from);
    else if (to == "Rad/h") vel = this.Velocidad.Rad_Por_Hora(vel, from);
    else if (to == "Rev/m") vel = this.Velocidad.Rev_Por_Min(vel, from);
    else if (to == "Rev/s") vel = this.Velocidad.Rev_Por_Segundos(vel, from);
    else if (to == "Rev/h") vel = this.Velocidad.Rev_Por_Hora(vel, from);

    return vel;
  }

  convertirVelocidad(vel: number, from: typeof InputUnits.Velocidad[number], to: typeof InputUnits.Velocidad[number]) {
    if (to == "M/S") vel = this.Velocidad.Mt_Por_Segundo(vel, from);
    else if (to == "KM/H") vel = this.Velocidad.Km_Por_Hora(vel, from);
    else if (to == "MPH") vel = this.Velocidad.MPH(vel, from);

    return vel;
  }

  convertirFrecuencia(
    frecuencia,
    from: typeof InputUnits.Frecuencia[number],
    to: typeof InputUnits.Frecuencia[number]
  ) {
    //console.log("Frecuencia -> Conversion:from ", frecuencia);

    if (from == "Hz" && to == "RPM") {
      frecuencia = this.Frecuencia.hz_to_rpm(frecuencia);
    } else if (from == "RPM" && to == "Hz") {
      frecuencia = this.Frecuencia.rpm_to_hz(frecuencia);
    }
    //console.log("Frecuencia -> Connversion:Salida", frecuencia);
    return frecuencia;
  }

  public convertirTiempo(tiempo, from: typeof InputUnits.Tiempo[number], to: typeof InputUnits.Tiempo[number]) {
    //console.log("Conversion:from ", tiempo);
    if (from == "h" && to == "min") tiempo = this.Tiempo.hh_a_mm(tiempo);
    else if (from == "h" && to == "s") tiempo = this.Tiempo.hh_a_Segundoss(tiempo);
    else if (from == "min" && to == "h") tiempo = this.Tiempo.mm_a_hh(tiempo);
    else if (from == "min" && to == "s") tiempo = this.Tiempo.mm_a_Segundoss(tiempo);
    else if (from == "s" && to == "min") tiempo = this.Tiempo.ss_a_mm(tiempo);
    else if (from == "s" && to == "h") tiempo = this.Tiempo.ss_a_hh(tiempo);

    //console.log("Connversion:Salida", tiempo);
    return tiempo;

    return tiempo;
  }

  public convertirTiempoInteres(
    tiempo,
    from: typeof InputUnits.TiempoInteres[number],
    to: typeof InputUnits.TiempoInteres[number]
  ) {
    if (to == "Anos") tiempo = this.Tiempo.anos(tiempo, from);
    else if (to == "Meses") tiempo = this.Tiempo.meses(tiempo, from);
    else if (to == "Dias") tiempo = this.Tiempo.dias(tiempo, from);
    else if (to == "Trimestres") tiempo = this.Tiempo.trimestres(tiempo, from);

    return tiempo;
  }

  public convertirLongitud(
    longitud: number,
    from: typeof InputUnits.Longitud[number],
    to: typeof InputUnits.Longitud[number]
  ) {
    //console.log("Longitud -> Conversion:from ", longitud);

    if (from == "M" && to == "Cm") {
      longitud = this.Longitud.mt_a_cm(longitud);
    } else if (from == "M" && to == "Km") {
      longitud = this.Longitud.mt_a_km(longitud);
    } else if (from == "Cm" && to == "M") {
      longitud = this.Longitud.cm_a_mt(longitud);
    } else if (from == "Cm" && to == "Km") {
      longitud = this.Longitud.cm_a_km(longitud);
    } else if (from == "Km" && to == "M") {
      longitud = this.Longitud.km_a_mt(longitud);
    } else if (from == "Km" && to == "Cm") {
      longitud = this.Longitud.km_a_cm(longitud);
    }

    //console.log("Longitud -> Connversion:Salida", longitud);

    return longitud;
  }

  convertirArco(arco: number, from: typeof InputUnits.Arco[number], to: typeof InputUnits.Arco[number]) {
    //console.log("Conversion:from ", arco);
    if (from == "Rad" && to == "Rev") {
      arco = this.Longitud.Angular.RadianARev(arco);
    } else if (from == "Rev" && to == "Rad") {
      arco = this.Longitud.Angular.RevolucionARadian(arco);
    }
    //console.log("Connversion:Salida", arco);
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
  Rad_Por_Segundo(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/m") {
      vel = vel * 0.016666666667;
    } else if (from == "Rad/h") {
      vel = vel * 0.00027777777778;
    } else if (from == "Rev/s") {
      vel = vel * 6.2831853072;
    } else if (from == "Rev/m") {
      vel = vel * 0.10471975512;
    } else if (from == "Rev/h") {
      vel = vel * 0.001745329252;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Min(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/s") {
      vel = vel * 60;
    } else if (from == "Rad/h") {
      vel = vel * 0.016666666667;
    } else if (from == "Rev/s") {
      vel = vel * 376.99111843;
    } else if (from == "Rev/m") {
      vel = vel * 6.2831853072;
    } else if (from == "Rev/h") {
      vel = vel * 0.10471975512;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Hora(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/m") {
      vel = vel * 60;
    } else if (from == "Rad/s") {
      vel = vel * 3600;
    } else if (from == "Rev/s") {
      vel = vel * 22619.467106;
    } else if (from == "Rev/m") {
      vel = vel * 376.99111843;
    } else if (from == "Rev/h") {
      vel = vel * 6.2831853072;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Segundos(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/m") {
      vel = vel * 0.0026525823849;
    } else if (from == "Rad/h") {
      vel = vel * 0.000044209706414;
    } else if (from == "Rad/s") {
      vel = vel * 0.15915494309;
    } else if (from == "Rev/m") {
      vel = vel * 0.016666666667;
    } else if (from == "Rev/h") {
      vel = vel * 0.00027777777778;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Min(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/s") {
      vel = vel * 9.5492965855;
    } else if (from == "Rad/h") {
      vel = vel * 0.0026525823849;
    } else if (from == "Rev/s") {
      vel = vel * 60;
    } else if (from == "Rad/m") {
      vel = vel * 0.15915494309;
    } else if (from == "Rev/h") {
      vel = vel * 0.016666666667;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Hora(vel: number, from: typeof InputUnits.Velocidad_Angular[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "Rad/m") {
      vel = vel * 9.5492965855;
    } else if (from == "Rad/s") {
      vel = vel * 572.95779513;
    } else if (from == "Rev/s") {
      vel = vel * 3600;
    } else if (from == "Rev/m") {
      vel = vel * 60;
    } else if (from == "Rad/h") {
      vel = vel * 0.15915494309;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Mt_Por_Segundo(vel: number, from: typeof InputUnits.Velocidad[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "MPH") vel = vel / 2.237;
    else if (from == "KM/H") vel = vel / 3.6;

    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  Km_Por_Hora(vel: number, from: typeof InputUnits.Velocidad[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "M/S") {
      vel = vel * 3.6;
    } else if (from == "MPH") {
      vel = vel * 1.609344;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }

  MPH(vel: number, from: typeof InputUnits.Velocidad[number]) {
    //console.log("Velocidad -> Conversion:from ", vel);

    if (from == "M/S") {
      vel = vel * 2.2369362921;
    } else if (from == "KM/H") {
      vel = vel / 1.609344;
    }
    //console.log("Velocidad -> Connversion:Salida", vel);
    return vel;
  }
}

class Aceleracion {
  //El nombre de los metodos no lo indican, pero las units de aceleracion estan al cuadrado
  // 'M/S²', 'KM/S²', 'Mi/S²'

  //#region   Aceleracion Angular
  Rad_Por_Min(vel: number, from: typeof InputUnits.Aceleracion_Angular[number]) {
    //console.log("Aceleracion -> Conversion:from ", vel);

    if (from == "Rad/s²") {
      vel = vel * 3600;
    } else if (from == "Rev/m²") {
      vel = vel * 6.2831853062;
    } else if (from == "Rev/s²") {
      vel = vel * 22619.467102;
    }

    //console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rad_Por_Segundo(vel: number, from: typeof InputUnits.Aceleracion_Angular[number]) {
    //console.log("Aceleracion -> Conversion:from ", vel);

    if (from == "Rad/m²") {
      vel = vel * 0.00027777777778;
    } else if (from == "Rev/m²") {
      vel = vel * 0.0017453292517;
    } else if (from == "Rev/s²") {
      vel = vel * 6.2831853062;
    }

    //console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Segundos(vel: number, from: typeof InputUnits.Aceleracion_Angular[number]) {
    //console.log("Aceleracion -> Conversion:from ", vel);

    if (from == "Rad/m²") {
      vel = vel * 0.000044209706421;
    } else if (from == "Rad/s²") {
      vel = vel * 0.15915494312;
    } else if (from == "Rev/m²") {
      vel = vel * 0.00027777777778;
    }

    //console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }

  Rev_Por_Min(vel: number, from: typeof InputUnits.Aceleracion_Angular[number]) {
    //console.log("Aceleracion -> Conversion:from ", vel);

    if (from == "Rad/m²") {
      vel = vel * 0.15915494312;
    } else if (from == "Rad/s²") {
      vel = vel * 572.95779522;
    } else if (from == "Rev/s²") {
      vel = vel * 3600;
    }

    //console.log("Aceleracion -> Connversion:Salida", vel);
    return vel;
  }
  //#endregion

  Mt_Por_Segundo(aceleracion: number, from: typeof InputUnits.Aceleracion[number]) {
    //console.log("Aceleracion -> Conversion:from ", aceleracion);

    if (from == "KM/s²") {
      aceleracion = aceleracion * 1000;
    } else if (from == "Mi/s²") {
      aceleracion = aceleracion * 1609.344;
    }

    //console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }

  Millas_Por_Segundos(aceleracion: number, from: typeof InputUnits.Aceleracion[number]) {
    //console.log("Aceleracion -> Conversion:from ", aceleracion);

    if (from == "KM/s²") {
      aceleracion = aceleracion * 0.62137119224;
    } else if (from == "M/s²") {
      aceleracion = aceleracion * 0.00062137119224;
    }

    //console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }

  Km_Por_Segundos(aceleracion: number, from: typeof InputUnits.Aceleracion[number]) {
    //console.log("Aceleracion -> Conversion:from ", aceleracion);

    if (from == "M/s²") {
      aceleracion = aceleracion * 0.001;
    } else if (from == "Mi/s²") {
      aceleracion = aceleracion * 1.609344;
    }

    //console.log("Aceleracion -> Connversion:Salida", aceleracion);
    return aceleracion;
  }
}

class Tiempo {
  hh_a_mm(hh: number) {
    // 1 hh = 60mm
    return hh * 60;
  }

  hh_a_Segundoss(hh: number) {
    // 1 hh = 3600 ss
    return hh * 3600;
  }

  mm_a_Segundoss(mm: number) {
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

  // convertir a:
  meses(n: number, from: typeof InputUnits.TiempoInteres[number]) {
    if (from == "Anos") return n * 12;
    else if (from == "Trimestres") n * 30;
    else if (from == "Meses") return n;
    else if (from == "Dias") return n / 30;
  }

  // convertir a:
  anos(n: number, from: typeof InputUnits.TiempoInteres[number]) {
    if (from == "Anos") return n;
    else if (from == "Trimestres") return n / 4;
    else if (from == "Meses") return n / 12;
    else if (from == "Dias") return n / 360;
  }

  // convertir a:
  dias(n: number, from: typeof InputUnits.TiempoInteres[number]) {
    if (from == "Anos") return n * 360;
    if (from == "Trimestres") return n * 90;
    else if (from == "Meses") return n * 30;
    else return n;
  }

  // convertir a:
  trimestres(n: number, from: typeof InputUnits.TiempoInteres[number]) {
    if (from == "Anos") return n * 4;
    else if (from == "Meses") return n / 3;
    else if (from == "Dias") return n / 90;
    else return n;
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
    return km * 1000;
  }

  km_a_cm(km: number) {
    return km * 100000;
  }

  mt_a_cm(mt: number) {
    return mt * 100;
  }

  mt_a_km(mt: number) {
    return mt / 1000;
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
