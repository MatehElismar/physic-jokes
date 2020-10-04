(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"//To":function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));var o=i("e6jf"),r=i("JjRq"),a=i("fXoL");let t=(()=>{class e extends o.a{constructor(e){super("Cinematica Rotacional",[{topic:"Momento de torcion",desc:"\u03c4 = F * r * sen \u0472",properties:[{name:"Fuerza",allowedInputUnits:["Fuerza"]},{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Angulo",allowedInputUnits:["Angulo"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.MomentoDeTorcion(e.Fuerza,e.Radio,e.Angulo,n)},{desc:"\u03c4 = F * d",properties:[{name:"Fuerza",allowedInputUnits:["Fuerza"]},{name:"Palanca",allowedInputUnits:["Longitud"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.MomentoDeTorcion2(e.Fuerza,e.Palanca,n)},{desc:"\u03c4 = I * \u03c9",properties:[{name:"Inercia",allowedInputUnits:["Inercia"]},{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.MomentoDeTorcion3(e.Inercia,e.Velocidad,n)},{desc:"\u2211\u03c4 = I * \u03b1",properties:[{name:"Inercia",allowedInputUnits:["Inercia"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion_Angular"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.TorqueNeto(e.Inercia,e.Aceleracion,n)},{desc:"\u03c4 = P /  \u03c9",properties:[{name:"Potencia",allowedInputUnits:["Potencia"]},{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.MomentoDeTorcion4(e.Potencia,e.Velocidad,n)},{desc:"\u03c4 = Vector del radio *  Vector de la fuerza",properties:[{name:"Radio: Valor1",allowedInputUnits:["Componentes"]},{name:"Radio: Valor2",allowedInputUnits:["Componentes"]},{name:"Fuerza: Valor1",allowedInputUnits:["Componentes"]},{name:"Fuerza: Valor2",allowedInputUnits:["Componentes"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.MomentoDeTorcion5(e.Valor1,e.Valor2,n),validateComponentes:(e,n)=>{const i=e.units;for(let o=0;o<i.length;o++)n.selectedU==i[o]&&e.units.pop(i[o]),e.selectedU==i[o]&&e.units.pop(i[o])}},{topic:"Palanca De Torcion",desc:"d = r * sen \u01ff",properties:[{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Angulo",allowedInputUnits:["Angulo"]}],units:"Longitud",handler:(e,n)=>this.PalancaDeTorcion(e.Radio,e.Angulo,n)},{topic:" Momento de inercia",desc:"I = m * r\xb2",properties:[{name:"Masa",allowedInputUnits:["Peso"]},{name:"Radio",allowedInputUnits:["Longitud"]}],units:"MomentoDeTorcion",handler:(e,n)=>this.Inercia(e.Masa,e.Radio,n)},{desc:"I = \u2211\u03c4 / \u03b1",properties:[{name:"Torque_Neto",allowedInputUnits:["MomentoDeTorcion"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion_Angular"]}],units:"Potencia",handler:(e,n)=>this.Inercia2(e.Torque_Neto,e.Aceleracion,n)},{topic:"Potencia",desc:"P = \u03c4 * \u03c9",properties:[{name:"Torque",allowedInputUnits:["MomentoDeTorcion"]},{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]}],units:"Potencia",handler:(e,n)=>this.Potencia(e.Torque,e.Velocidad,n)},{desc:"P = W / t",properties:[{name:"Trabajo",allowedInputUnits:["Trabajo"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Potencia",handler:(e,n)=>this.Potencia2(e.Trabajo,e.Tiempo,n)},{topic:"Trabajo",desc:"W = (1/2 * I * Wf\xb2)  -  (1/2 * I * Wi\xb2)",properties:[{name:"Trabajo_Inicial",allowedInputUnits:["Trabajo"]},{name:"Trabajo_Final",allowedInputUnits:["Trabajo"]},{name:"Inercia",allowedInputUnits:["Inercia"]}],units:"Trabajo",handler:(e,n)=>this.Trabajo(e.Inercia,e.Trabajo_Inicial,e.Trabajo,n)},{desc:"W = P / t",properties:[{name:"Potencia",allowedInputUnits:["Potencia"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Trabajo",handler:(e,n)=>this.Trabajo2(e.Potencia,e.Tiempo,n)},{desc:"W = M * G * H",properties:[{name:"Masa",allowedInputUnits:["Peso"]},{name:"Gravedad",allowedInputUnits:["none"]},{name:"Altura",allowedInputUnits:["Longitud"]}],units:"Trabajo",handler:(e,n)=>this.Trabajo3(e.Masa,e.Altura,n)},{topic:"Fuerza Tangencial",desc:"Ft = At / M",properties:[{name:"Aceleracion",allowedInputUnits:["Aceleracion"]},{name:"Masa",allowedInputUnits:["Peso"]}],units:"Fuerza",handler:(e,n)=>this.FuerzaTangencial(e.Aceleracion,e.Masa,n)},{topic:"Masa",desc:"M = Ft / At",properties:[{name:"Fuerza",allowedInputUnits:["Fuerza"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion"]}],units:"Peso",handler:(e,n)=>this.Masa(e.Fuerza,e.Aceleracion,n)}]),this.conversiones=e}Trabajo(e,n,i,o){return.5*e*Math.pow(i,2)-.5*e*Math.pow(n,2)}Trabajo2(e,n,i){return e/this.conversiones.convertirTiempo(n,i.Tiempo,"s")}Trabajo3(e,n,i){return 9.8*e*this.conversiones.convertirLongitud(n,i.Altura,"M")}FuerzaTangencial(e,n,i){return(e=this.conversiones.convertirAceleracion(e,i.Aceleracion,"M/s\xb2"))/n}Masa(e,n,i){return e/this.conversiones.convertirAceleracion(n,i.Aceleracion,"M/s\xb2")}MomentoDeTorcion(e,n,i,o){return i=this.conversiones.convertirAngulo(i,o.Angulo),(n=this.conversiones.convertirLongitud(n,o.Radio,"M"))*e*Math.sin(i)}MomentoDeTorcion2(e,n,i){return e*this.conversiones.convertirLongitud(n,i.Palanca,"M")}MomentoDeTorcion3(e,n,i){return e*this.conversiones.convertirVelocidadAngular(n,i.Velocidad,"Rad/s")}MomentoDeTorcion4(e,n,i){return e/this.conversiones.convertirVelocidadAngular(n,i.Velocidad,"Rad/s")}MomentoDeTorcion5(e,n,i){return 0}TorqueNeto(e,n,i){return e*this.conversiones.convertirAceleracion(n,i.Aceleracion,"Rad/s\xb2")}Inercia(e,n,i){return n=this.conversiones.convertirLongitud(n,i.Radio,"M"),e*Math.pow(n,2)}Inercia2(e,n,i){return e/this.conversiones.convertirAceleracion(n,i.Aceleracion,"Rad/s\xb2")}PalancaDeTorcion(e,n,i){n=this.conversiones.convertirAngulo(n,i.Angulo),e=this.conversiones.convertirLongitud(e,i.Radio,"M");const o=Math.sin(n);return this.conversiones.convertirLongitud(e*o,"M",i.Salida)}Potencia(e,n,i){return e*this.conversiones.convertirVelocidadAngular(n,i.Velocidad,"Rad/s")}Potencia2(e,n,i){return e/this.conversiones.convertirTiempo(n,i.Tiempo,"s")}}return e.\u0275fac=function(n){return new(n||e)(a.Qb(r.a))},e.\u0275prov=a.Db({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},"I+er":function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));var o=i("e6jf"),r=i("JjRq"),a=i("fXoL");let t=(()=>{class e extends o.a{constructor(e){super("Velocidad Angular",[{topic:"Velocidad Angular",desc:" \u03c9 = 2\u03c0/T",properties:[{name:"Periodo",allowedInputUnits:["Tiempo"]},{name:"PI",allowedInputUnits:["none"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed2(e.Periodo,n)},{desc:" \u03c9 = \u03c9\ufe83 + \u03b1 * t",properties:[{name:"Velocidad_Inicial",allowedInputUnits:["Velocidad_Angular"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion_Angular"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed1(e.Velocidad_Inicial,e.Aceleracion,e.Tiempo,n)},{desc:" \u03c9 = \u019f / t",properties:[{name:"Arco",allowedInputUnits:["Arco"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed(e.Arco,e.Tiempo,n)},{desc:"\u03c9 = 2\u03c0 * f",properties:[{name:"PI",allowedInputUnits:["none"]},{name:"Frecuencia",allowedInputUnits:["Frecuencia"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed3(e.Frecuencia,n)},{desc:"\u03c9 = Vt / r",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad"]},{name:"Radio",allowedInputUnits:["Longitud"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed4(e.Velocidad,e.Radio,n)},{desc:"\u03c9 = P / \u03c4",properties:[{name:"Potencia",allowedInputUnits:["Potencia"]},{name:"Torque",allowedInputUnits:["MomentoDeTorcion"]}],units:"Velocidad_Angular",handler:(e,n)=>this.CircularSpeed5(e.Potencia,e.Torque,n)},{topic:"Velocidad Tangencial",desc:"Vt = 2\u03c0 * r / T",properties:[{name:"PI",allowedInputUnits:["none"]},{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Periodo",allowedInputUnits:["Tiempo"]}],units:"Velocidad",handler:(e,n)=>this.VelocidadTangencial(e.Radio,e.Periodo,n)},{desc:"Vt = 2\u03c0 * r * f",properties:[{name:"PI",allowedInputUnits:["none"]},{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Frecuencia",allowedInputUnits:["Frecuencia"]}],units:"Velocidad",handler:(e,n)=>this.VelocidadTangencial_1(e.Radio,e.Frecuencia,n)},{desc:"Vt = \u03c9 * r",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]},{name:"Radio",allowedInputUnits:["Longitud"]}],units:"Velocidad",handler:(e,n)=>this.VelocidadTangencial_2(e.Velocidad,e.Radio,n)},{topic:"Aceleracion Angular",desc:"\u03b1 = \u03c9f - \u03c9\ufe83 / t",properties:[{name:"Velocidad_Inicial",allowedInputUnits:["Velocidad_Angular"]},{name:"Velocidad_Final",allowedInputUnits:["Velocidad_Angular"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Aceleracion_Angular",handler:(e,n)=>this.Aceleracion(e.Velocidad_Final,e.Velocidad_Inicial,e.Tiempo,n)},{desc:"\u03b1 = \u03c9 / t",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Aceleracion_Angular",handler:(e,n)=>this.Aceleracion3(e.Velocidad,e.Tiempo,n)},{desc:"\u03b1 = At / r",properties:[{name:"Aceleracion",allowedInputUnits:["Aceleracion"]},{name:"Radio",allowedInputUnits:["Longitud"]}],units:"Aceleracion_Angular",handler:(e,n)=>this.Aceleracion2(e.Aceleracion,e.Radio,n)},{topic:"Aceleracion Tangencial",desc:"At = r * \u03b1",properties:[{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion_Angular"]}],units:"Aceleracion",handler:(e,n)=>this.AceleracionTangencial(e.Radio,e.Aceleracion,n)},{desc:"At = Ft / M",properties:[{name:"Fuerza",allowedInputUnits:["Fuerza"]},{name:"Masa",allowedInputUnits:["Peso"]}],units:"Aceleracion",handler:(e,n)=>this.AceleracionTangencial2(e.Fuerza,e.Masa,n)},{topic:"Tiempo",desc:"t = \u019f / \u03c9",properties:[{name:"Arco",allowedInputUnits:["Arco"]},{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]}],units:"Tiempo",handler:(e,n)=>this.CircularTime(e.Arco,e.Velocidad,n)},{topic:"Frecuencia",desc:" f = 1 / T",properties:[{name:"Periodo",allowedInputUnits:["Tiempo"]}],units:"Frecuencia",handler:(e,n)=>this.Frecuencia(e.Periodo,n)},{desc:" f = Vt / 2\u03c0 * r",properties:[{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Velocidad",allowedInputUnits:["Velocidad"]}],units:"Frecuencia",handler:(e,n)=>this.Frecuencia1(e.Radio,e.Velocidad,n)},{topic:"Periodo",desc:" T = 1 / f",properties:[{name:"Frecuencia",allowedInputUnits:["Frecuencia"]}],units:"Tiempo",handler:(e,n)=>this.Periodo(e.Frecuencia,n)},{desc:" T = 2\u03c0 / \u03c9",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]}],units:"Tiempo",handler:(e,n)=>this.Periodo2(e.Velocidad,n)},{desc:" T = 2\u03c0 * r / Vt",properties:[{name:"Radio",allowedInputUnits:["Longitud"]},{name:"Velocidad",allowedInputUnits:["Velocidad"]}],units:"Tiempo",handler:(e,n)=>this.Periodo1(e.Radio,e.Velocidad,n)},{topic:"Desplazamiento Angular",desc:"\u019f = \u03c9 * t",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Arco",handler:(e,n)=>this.ArcoRecorrido(e.Velocidad,e.Tiempo,n)},{desc:"\u019ff = \u019f1 + (\u03c9 * t) + 1/2 (\u03b1 * t\xb2)",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad_Angular"]},{name:"Arco_Inicial",allowedInputUnits:["Arco"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion_Angular"]}],units:"Arco",handler:(e,n)=>this.ArcoRecorrido2(e.Velocidad,e.Arco_Inicial,e.Tiempo,e.Aceleracion,n)}]),this.conversiones=e}Aceleracion(e,n,i,o){return e=this.conversiones.convertirVelocidadAngular(e,o.Velocidad_Final,"Rad/s"),n=this.conversiones.convertirVelocidadAngular(e,o.Velocidad_Inicial,"Rad/s"),i=this.conversiones.convertirTiempo(i,o.Tiempo,"s"),this.conversiones.convertirAceleracion((e-n)/i,"Rad/s\xb2",o.Salida)}Aceleracion2(e,n,i){return e=this.conversiones.convertirAceleracion(e,i.Aceleracion,"Rad/s\xb2"),n=this.conversiones.convertirLongitud(n,i.Radio,"M"),this.conversiones.convertirAceleracion(e/n,"Rad/s\xb2",i.Salida)}Aceleracion3(e,n,i){return e=this.conversiones.convertirVelocidadAngular(e,i.Velocidad,"Rad/s"),n=this.conversiones.convertirTiempo(n,i.Tiempo,"s"),this.conversiones.convertirAceleracion(e/n,"Rad/s\xb2",i.Salida)}AceleracionTangencial(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Radio,"M"),n=this.conversiones.convertirAceleracion(n,i.Aceleracion,"Rad/s\xb2"),this.conversiones.convertirAceleracion(e*n,"Rad/s\xb2",i.Salida)}AceleracionTangencial2(e,n,i){return this.conversiones.convertirAceleracion(e/n,"M/s\xb2",i.Salida)}CircularSpeed(e,n,i){return n=this.conversiones.convertirTiempo(n,i.Tiempo,"s"),e=this.conversiones.convertirArco(e,i.Arco,"Rad"),this.conversiones.convertirVelocidadAngular(e/n,"Rad/s",i.Salida)}CircularSpeed1(e,n,i,o){return i=this.conversiones.convertirTiempo(i,o.Tiempo,"s"),n=this.conversiones.convertirAceleracion(i,o.Aceleracion,"Rad/s\xb2"),e=this.conversiones.convertirVelocidadAngular(e,o.Velocidad_Inicial,"Rad/s"),this.conversiones.convertirVelocidadAngular(e+n*i,"Rad/s",o.Salida)}CircularSpeed2(e,n){return e=this.conversiones.convertirTiempo(e,n.Periodo,"s"),this.conversiones.convertirVelocidadAngular(6.2832/e,"Rad/s",n.Salida)}CircularSpeed3(e,n){return e=this.conversiones.convertirFrecuencia(e,n.Frecuencia,"Hz"),this.conversiones.convertirVelocidadAngular(6.2832*e,"Rad/s",n.Salida)}CircularSpeed4(e,n,i){return e=this.conversiones.convertirVelocidad(e,i.Velocidad,"M/S"),n=this.conversiones.convertirLongitud(n,i.Radio,"M"),this.conversiones.convertirVelocidadAngular(e/n,"Rad/s",i.Salida)}CircularSpeed5(e,n,i){return this.conversiones.convertirVelocidadAngular(e/n,"Rad/s",i.Salida)}CircularTime(e,n,i){return e=this.conversiones.convertirArco(e,i.Arco,"Rad"),n=this.conversiones.convertirVelocidadAngular(n,i.Velocidad,"Rad/s"),this.conversiones.convertirTiempo(e/n,"s",i.Salida)}ArcoRecorrido(e,n,i){return n=this.conversiones.convertirTiempo(n,i.Tiempo,"s"),e=this.conversiones.convertirVelocidadAngular(e,i.Velocidad,"Rad/s"),this.conversiones.convertirArco(e*n,"Rad",i.Salida)}ArcoRecorrido2(e,n,i,o,r){e=this.conversiones.convertirVelocidadAngular(e,r.Velocidad,"Rad/s"),i=this.conversiones.convertirTiempo(i,r.Tiempo,"s");const a=(n=this.conversiones.convertirArco(n,r.Arco_Inicial,"Rad"))+e*i+this.conversiones.convertirAceleracion(n,r.Aceleracion,"Rad/s\xb2")*Math.pow(i,2)*.5;return this.conversiones.convertirArco(a,"Rad",r.Salida)}Periodo(e,n){return e=this.conversiones.convertirFrecuencia(e,n.Frecuencia,"Hz"),this.conversiones.convertirTiempo(1/e,"s",n.Salida)}Periodo1(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Radio,"M"),n=this.conversiones.convertirVelocidad(n,i.Velocidad,"M/S"),this.conversiones.convertirTiempo(6.2832*e/n,"s",i.Salida)}Periodo2(e,n){return e=this.conversiones.convertirVelocidadAngular(e,n.Velocidad,"Rad/s"),this.conversiones.convertirTiempo(6.2832/e,"s",n.Salida)}Frecuencia(e,n){return e=this.conversiones.convertirTiempo(e,n.Periodo,"s"),this.conversiones.convertirFrecuencia(1/e,"Hz",n.Salida)}Frecuencia1(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Radio,"M"),n=this.conversiones.convertirVelocidad(n,i.Velocidad,"M/S"),this.conversiones.convertirFrecuencia(n/(6.2832*e),"Hz",i.Salida)}VelocidadTangencial(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Radio,"M"),n=this.conversiones.convertirTiempo(n,i.Periodo,"s"),this.conversiones.convertirVelocidad(6.2832*e/n,"M/S",i.Salida)}VelocidadTangencial_1(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Radio,"M"),n=this.conversiones.convertirFrecuencia(n,i.Frecuencia,"Hz"),this.conversiones.convertirVelocidad(6.2832*e*n,"M/S",i.Salida)}VelocidadTangencial_2(e,n,i){return n=this.conversiones.convertirLongitud(n,i.Radio,"M"),e=this.conversiones.convertirVelocidadAngular(e,i.Velocidad,"Rad/s"),this.conversiones.convertirVelocidad(e*n,"M/S",i.Salida)}}return e.\u0275fac=function(n){return new(n||e)(a.Qb(r.a))},e.\u0275prov=a.Db({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},JjRq:function(e,n,i){"use strict";i.d(n,"b",(function(){return a})),i.d(n,"a",(function(){return t}));var o=i("e6jf"),r=i("fXoL");let a=(()=>{class e{}return e.null=[],e.none=["Constante"],e.Angulo=["Grados","Radian"],e.Arco=["Rad","Rev"],e.Velocidad=["M/S","MPH","KM/H"],e.Velocidad_Angular=["Rad/s","Rad/m","Rad/h","Rev/s","Rev/m","Rev/h"],e.Tiempo=["s","min","h"],e.TiempoInteres=["Dias","Meses","Trimestres","Anos"],e.Aceleracion=["M/s\xb2","KM/s\xb2","Mi/s\xb2"],e.Aceleracion_Angular=["Rad/s\xb2","Rad/m\xb2","Rev/s\xb2","Rev/m\xb2"],e.Longitud=["Cm","M","Km","Mi"],e.Fuerza=["N"],e.Frecuencia=["Hz","RPM","RPS"],e.Peso=["Kg"],e.Inercia=["Kg*m\xb2"],e.Potencia=["Watt"],e.Trabajo=["Julios"],e.Componentes=["J","K","I"],e.MomentoDeTorcion=["N*M"],e.TasaDeInteres=["Anual","Trimestral","Mensual","Diaria"],e.Dinero=["RD$"],e})(),t=(()=>{class e extends o.a{constructor(){super("Conversiones",[{desc:"Angulos",properties:[{name:"Grados",allowedInputUnits:["Angulo"]}],units:"Angulo",handler:e=>this.GradoARadian(e.Grados)},{desc:"Arcos",properties:[{name:"Radian",allowedInputUnits:["Arco"]}],units:"Arco",handler:e=>this.RadianAGrado(e.Radian)},{desc:"Longitudes",properties:[{name:"Centimetros",allowedInputUnits:["Longitud"]}],units:"Longitud",handler:e=>this.Longitud.cm_a_mt(e.Centimetros)}]),this.Tiempo=new d,this.Longitud=new l,this.Frecuencia=new u,this.Velocidad=new s,this.Aceleracion=new c}RadianAGrado(e){return 180*e/3.1416}GradoARadian(e){return 3.14*e/180}convertirTasaDeInteres(e,n,i){return"Anual"==n&&"Mensual"==i?e/12:"Anual"==n&&"Diaria"==i?e/360:"Anual"==n&&"Trimestral"==i?e/4:"Mensual"==n&&"Anual"==i?12*e:"Mensual"==n&&"Diaria"==i?e/30:"Mensual"==n&&"Trimestral"==i?3*e:"Diaria"==n&&"Mensual"==i?30*e:"Diaria"==n&&"Anual"==i?360*e:"Diaria"==n&&"Trimestral"==i?90*e:e}convertirAngulo(e,n){return"Radian"==n?e=this.RadianAGrado(e):"Grados"==n&&(e=this.GradoARadian(e)),e}convertirAceleracion(e,n,i){return"M/s\xb2"==i?e=this.Aceleracion.Mt_Por_Segundo(e,n):"KM/s\xb2"==i?e=this.Aceleracion.Km_Por_Segundos(e,n):"Mi/s\xb2"==i?e=this.Aceleracion.Millas_Por_Segundos(e,n):"Rad/s\xb2"==i?e=this.Aceleracion.Rad_Por_Segundo(e,n):"Rad/m\xb2"==i?e=this.Aceleracion.Rad_Por_Min(e,n):"Rev/s\xb2"==i?e=this.Aceleracion.Rev_Por_Segundos(e,n):"Rev/m\xb2"==i&&(e=this.Aceleracion.Rev_Por_Min(e,n)),e}convertirVelocidadAngular(e,n,i){return"Rad/s"==i?e=this.Velocidad.Rad_Por_Segundo(e,n):"Rad/m"==i?e=this.Velocidad.Rad_Por_Min(e,n):"Rad/h"==i?e=this.Velocidad.Rad_Por_Hora(e,n):"Rev/m"==i?e=this.Velocidad.Rev_Por_Min(e,n):"Rev/s"==i?e=this.Velocidad.Rev_Por_Segundos(e,n):"Rev/h"==i&&(e=this.Velocidad.Rev_Por_Hora(e,n)),e}convertirVelocidad(e,n,i){return"M/S"==i?e=this.Velocidad.Mt_Por_Segundo(e,n):"KM/H"==i?e=this.Velocidad.Km_Por_Hora(e,n):"MPH"==i&&(e=this.Velocidad.MPH(e,n)),e}convertirFrecuencia(e,n,i){return"Hz"==n&&"RPM"==i?e=this.Frecuencia.hz_to_rpm(e):"RPM"==n&&"Hz"==i&&(e=this.Frecuencia.rpm_to_hz(e)),e}convertirTiempo(e,n,i){return"h"==n&&"min"==i?e=this.Tiempo.hh_a_mm(e):"h"==n&&"s"==i?e=this.Tiempo.hh_a_Segundoss(e):"min"==n&&"h"==i?e=this.Tiempo.mm_a_hh(e):"min"==n&&"s"==i?e=this.Tiempo.mm_a_Segundoss(e):"s"==n&&"min"==i?e=this.Tiempo.ss_a_mm(e):"s"==n&&"h"==i&&(e=this.Tiempo.ss_a_hh(e)),e}convertirTiempoInteres(e,n,i){return"Anos"==i?e=this.Tiempo.anos(e,n):"Meses"==i?e=this.Tiempo.meses(e,n):"Dias"==i?e=this.Tiempo.dias(e,n):"Trimestres"==i&&(e=this.Tiempo.trimestres(e,n)),e}convertirLongitud(e,n,i){return"M"==n&&"Cm"==i?e=this.Longitud.mt_a_cm(e):"M"==n&&"Km"==i?e=this.Longitud.mt_a_km(e):"Cm"==n&&"M"==i?e=this.Longitud.cm_a_mt(e):"Cm"==n&&"Km"==i?e=this.Longitud.cm_a_km(e):"Km"==n&&"M"==i?e=this.Longitud.km_a_mt(e):"Km"==n&&"Cm"==i&&(e=this.Longitud.km_a_cm(e)),e}convertirArco(e,n,i){return"Rad"==n&&"Rev"==i?e=this.Longitud.Angular.RadianARev(e):"Rev"==n&&"Rad"==i&&(e=this.Longitud.Angular.RevolucionARadian(e)),e}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=r.Db({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();class s{constructor(){this.Tiempo=new d,this.Arco=new p,this.Distancia=new l}Rad_Por_Segundo(e,n){return"Rad/m"==n?e*=.016666666667:"Rad/h"==n?e*=.00027777777778:"Rev/s"==n?e*=6.2831853072:"Rev/m"==n?e*=.10471975512:"Rev/h"==n&&(e*=.001745329252),e}Rad_Por_Min(e,n){return"Rad/s"==n?e*=60:"Rad/h"==n?e*=.016666666667:"Rev/s"==n?e*=376.99111843:"Rev/m"==n?e*=6.2831853072:"Rev/h"==n&&(e*=.10471975512),e}Rad_Por_Hora(e,n){return"Rad/m"==n?e*=60:"Rad/s"==n?e*=3600:"Rev/s"==n?e*=22619.467106:"Rev/m"==n?e*=376.99111843:"Rev/h"==n&&(e*=6.2831853072),e}Rev_Por_Segundos(e,n){return"Rad/m"==n?e*=.0026525823849:"Rad/h"==n?e*=44209706414e-15:"Rad/s"==n?e*=.15915494309:"Rev/m"==n?e*=.016666666667:"Rev/h"==n&&(e*=.00027777777778),e}Rev_Por_Min(e,n){return"Rad/s"==n?e*=9.5492965855:"Rad/h"==n?e*=.0026525823849:"Rev/s"==n?e*=60:"Rad/m"==n?e*=.15915494309:"Rev/h"==n&&(e*=.016666666667),e}Rev_Por_Hora(e,n){return"Rad/m"==n?e*=9.5492965855:"Rad/s"==n?e*=572.95779513:"Rev/s"==n?e*=3600:"Rev/m"==n?e*=60:"Rad/h"==n&&(e*=.15915494309),e}Mt_Por_Segundo(e,n){return"MPH"==n?e/=2.237:"KM/H"==n&&(e/=3.6),e}Km_Por_Hora(e,n){return"M/S"==n?e*=3.6:"MPH"==n&&(e*=1.609344),e}MPH(e,n){return"M/S"==n?e*=2.2369362921:"KM/H"==n&&(e/=1.609344),e}}class c{Rad_Por_Min(e,n){return"Rad/s\xb2"==n?e*=3600:"Rev/m\xb2"==n?e*=6.2831853062:"Rev/s\xb2"==n&&(e*=22619.467102),e}Rad_Por_Segundo(e,n){return"Rad/m\xb2"==n?e*=.00027777777778:"Rev/m\xb2"==n?e*=.0017453292517:"Rev/s\xb2"==n&&(e*=6.2831853062),e}Rev_Por_Segundos(e,n){return"Rad/m\xb2"==n?e*=44209706421e-15:"Rad/s\xb2"==n?e*=.15915494312:"Rev/m\xb2"==n&&(e*=.00027777777778),e}Rev_Por_Min(e,n){return"Rad/m\xb2"==n?e*=.15915494312:"Rad/s\xb2"==n?e*=572.95779522:"Rev/s\xb2"==n&&(e*=3600),e}Mt_Por_Segundo(e,n){return"KM/s\xb2"==n?e*=1e3:"Mi/s\xb2"==n&&(e*=1609.344),e}Millas_Por_Segundos(e,n){return"KM/s\xb2"==n?e*=.62137119224:"M/s\xb2"==n&&(e*=.00062137119224),e}Km_Por_Segundos(e,n){return"M/s\xb2"==n?e*=.001:"Mi/s\xb2"==n&&(e*=1.609344),e}}class d{hh_a_mm(e){return 60*e}hh_a_Segundoss(e){return 3600*e}mm_a_Segundoss(e){return 60*e}mm_a_hh(e){return e/60}ss_a_mm(e){return e/60}ss_a_hh(e){return e/3600}meses(e,n){if("Anos"==n)return 12*e;if("Trimestres"==n);else{if("Meses"==n)return e;if("Dias"==n)return e/30}}anos(e,n){return"Anos"==n?e:"Trimestres"==n?e/4:"Meses"==n?e/12:"Dias"==n?e/360:void 0}dias(e,n){return"Anos"==n?360*e:"Trimestres"==n?90*e:"Meses"==n?30*e:e}trimestres(e,n){return"Anos"==n?4*e:"Meses"==n?e/3:"Dias"==n?e/90:e}}class l{constructor(){this.Angular=new p}cm_a_mt(e){return e/100}cm_a_km(e){return e/1e5}km_a_mt(e){return 1e3*e}km_a_cm(e){return 1e5*e}mt_a_cm(e){return 100*e}mt_a_km(e){return e/1e3}}class u{rpm_to_hz(e){return.0166666667*e}hz_to_rpm(e){return e/.0166666667}}class p{RevolucionARadian(e){return 2*e*3.1416}RadianARev(e){return e/6.2832}}},e6jf:function(e,n,i){"use strict";i.d(n,"a",(function(){return o}));class o{constructor(e,n){this.name="",this.formulas=new Array,this.name=e,this.formulas=n}}},mUVB:function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));var o=i("e6jf"),r=i("JjRq"),a=i("fXoL");let t=(()=>{class e extends o.a{constructor(e){super("Velocidad Transaccional",[{topic:"Velocidad",desc:" v = v * + a * t",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad"]},{name:"Aceleracion",allowedInputUnits:["Aceleracion"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Velocidad",handler:(e,n)=>this.CircularSpeed1(e.Velocidad,e.Aceleracion,e.Tiempo,n)},{desc:" v = d / t",properties:[{name:"Distancia",allowedInputUnits:["Longitud"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Velocidad",handler:(e,n)=>this.CircularSpeed(e.Distancia,e.Tiempo,n)},{topic:"Tiempo,",desc:"t = d / v",properties:[{name:"Distancia",allowedInputUnits:["Longitud"]},{name:"Velocidad",allowedInputUnits:["Velocidad"]}],units:"Tiempo",handler:(e,n)=>this.CircularTime(e.Distancia,e.Velocidad,n)},{topic:"Distancia",desc:"d = v * t",properties:[{name:"Velocidad",allowedInputUnits:["Velocidad"]},{name:"Tiempo",allowedInputUnits:["Tiempo"]}],units:"Longitud",handler:(e,n)=>this.Distancia(e.Velocidad,e.Tiempo,n)}]),this.conversiones=e}CircularSpeed(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Distancia,"M"),n=this.conversiones.convertirTiempo(n,i.Tiempo,"s"),this.conversiones.convertirVelocidad(e/n,"M/S",i.Salida)}CircularSpeed1(e,n,i,o){return i=this.conversiones.convertirTiempo(i,o.Tiempo,"s"),n=this.conversiones.convertirAceleracion(i,o.Aceleracion,"M/s\xb2"),this.conversiones.convertirVelocidad(e+n*i,"M/S",o.Salida)}CircularTime(e,n,i){return e=this.conversiones.convertirLongitud(e,i.Distancia,"M"),n=this.conversiones.convertirVelocidad(n,i.Velocidad,"M/S"),this.conversiones.convertirTiempo(e/n,"s",i.Salida)}Distancia(e,n,i){return n=this.conversiones.convertirTiempo(n,i.Tiempo,"s"),e=this.conversiones.convertirVelocidad(e,i.Velocidad,"M/S"),this.conversiones.convertirLongitud(e*n,"M",i.Salida)}}return e.\u0275fac=function(n){return new(n||e)(a.Qb(r.a))},e.\u0275prov=a.Db({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},nJp7:function(e,n,i){"use strict";i.d(n,"a",(function(){return t}));var o=i("e6jf"),r=i("JjRq"),a=i("fXoL");let t=(()=>{class e extends o.a{constructor(e){super("Intereses",[{topic:"Interes Simple",desc:"I = c * i * t",note:"Interes",properties:[{name:"Capital",allowedInputUnits:["Dinero"]},{name:"Tasa_De_Interes",allowedInputUnits:["TasaDeInteres"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"Dinero",handler:(e,n)=>this.interesSimpleComercial(e.Capital,e.Tasa_De_Interes,e.Tiempo,n)},{desc:"c = I / t * i",note:"Capital",properties:[{name:"Interes",allowedInputUnits:["Dinero"]},{name:"Tasa_De_Interes",allowedInputUnits:["TasaDeInteres"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"Dinero",handler:(e,n)=>this.CapitalDeInteresSimpleComercial(e.Interes,e.Tasa_De_Interes,e.Tiempo,n)},{desc:"i =  I/ c * t",note:"Tasa De Interes",properties:[{name:"Interes_Anual",allowedInputUnits:["Dinero"]},{name:"Capital",allowedInputUnits:["Dinero"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"TasaDeInteres",handler:(e,n)=>this.TasaDeInteresSimpleComercial(e.Interes_Anual,e.Capital,e.Tiempo,n)},{topic:"Interes Compuesto",desc:"Cn = Co * (1 + i)\u207f",note:"Valor Final",properties:[{name:"Capital",allowedInputUnits:["Dinero"]},{name:"Tasa_De_Interes",allowedInputUnits:["TasaDeInteres"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"Dinero",handler:(e,n)=>this.valorFinalDeInteresCompuesto(e.Capital,e.Tasa_De_Interes,e.Tiempo,n)},{desc:"Co = Cn / (1 + i)\u207f",note:"Capital",properties:[{name:"Valor_Final",allowedInputUnits:["Dinero"]},{name:"Tasa_De_Interes",allowedInputUnits:["TasaDeInteres"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"Dinero",handler:(e,n)=>this.capitalDeInteresCompuesto(e.Valor_Final,e.Tasa_De_Interes,e.Tiempo,n)},{desc:"n = Log(Cn/Co) / Log(1 + i)",note:"Tiempo",properties:[{name:"Valor_Final",allowedInputUnits:["Dinero"]},{name:"Capital",allowedInputUnits:["Dinero"]},{name:"Tasa_De_Interes",allowedInputUnits:["TasaDeInteres"]}],units:"TiempoInteres",handler:(e,n)=>this.tiempoDeInteresCompuesto(e.Valor_Final,e.Capital,e.Tasa_De_Interes,n)},{desc:"i = \u207f\u221a(Cn/Co) -1",note:"Tasa De Interes",properties:[{name:"Valor_Final",allowedInputUnits:["Dinero"]},{name:"Capital",allowedInputUnits:["Dinero"]},{name:"Tiempo",allowedInputUnits:["TiempoInteres"]}],units:"TasaDeInteres",handler:(e,n)=>this.tasaInteresDeInteresCompuesto(e.Valor_Final,e.Capital,e.Tiempo,n)}]),this.conversiones=e}interesSimple(e,n,i,o){return e*(n/=100)*this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Anual"==o.Tasa_De_Interes?"Anos":"Meses")}interesSimpleComercial(e,n,i,o){return i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Dias"),e*(n=this.conversiones.convertirTasaDeInteres(n/=100,o.Tasa_De_Interes,"Diaria"))*i}CapitalDeInteresSimpleComercial(e,n,i,o){return i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Dias"),e/((n=this.conversiones.convertirTasaDeInteres(n/=100,o.Tasa_De_Interes,"Diaria"))*i)}TasaDeInteresSimpleComercial(e,n,i,o){return i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Anos"),this.conversiones.convertirTasaDeInteres(e/(n*i),"Anual",o.Salida)}valorFinalDeInteresCompuesto(e,n,i,o){return i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Anual"==o.Tasa_De_Interes?"Anos":"Trimestral"==o.Tasa_De_Interes?"Trimestres":"Mensual"==o.Tasa_De_Interes?"Meses":"Dias"),e*Math.pow(1+(n/=100),i)}capitalDeInteresCompuesto(e,n,i,o){return i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Anual"==o.Tasa_De_Interes?"Anos":"Trimestral"==o.Tasa_De_Interes?"Trimestres":"Mensual"==o.Tasa_De_Interes?"Meses":"Dias"),e/Math.pow(1+(n/=100),i)}tiempoDeInteresCompuesto(e,n,i,o){i=this.conversiones.convertirTasaDeInteres(i/=100,o.Tasa_De_Interes,"Anual");const r=Math.log(e/n)/Math.log(1+i);return this.conversiones.convertirTiempoInteres(r,"Anos",o.Salida)}tasaInteresDeInteresCompuesto(e,n,i,o){i=this.conversiones.convertirTiempoInteres(i,o.Tiempo,"Anos");const r=Math.pow(e/n,1/i)-1;return this.conversiones.convertirTasaDeInteres(r,"Anual",o.Salida)}}return e.\u0275fac=function(n){return new(n||e)(a.Qb(r.a))},e.\u0275prov=a.Db({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);