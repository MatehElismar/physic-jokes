import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController, AlertController, IonSelect, ModalController, ToastController } from "@ionic/angular";
import { DataEntry, Formula, HistoryRecord } from "../models/topics.model";
import { ConversionesService, InputUnits } from "../services/conversiones.service";
import { AppService } from "../services/app.service";
import { Clipboard } from "@capacitor/core";
import { HistoryComponent } from "../components/history/history.component";
import { topics } from "../conts";
import { CinematicaRotacionalService } from "../services/cinematica-rotacional.service";
import { VelTransService } from "../services/vel-trans.service";
import { InterestService } from "../services/interest.service";
import { SpeedService } from "../services/speed.service";
import { BreakevenService } from "../services/breakeven.service";

@Component({
  selector: "app-insert-data",
  templateUrl: "./insert-data.page.html",
  styleUrls: ["./insert-data.page.scss"],
})
export class InsertDataPage implements OnInit {
  @ViewChildren(IonSelect, { read: IonSelect }) selects: QueryList<IonSelect>;
  @ViewChild(HistoryComponent, { read: HistoryComponent }) history: HistoryComponent;
  formula: Formula;
  uMedida: any;
  unidadSalida: string;
  inputs: any[];
  result: number;
  formulaUnits: any[]; //array de unidades de salida de la formula

  constructor(
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    public app: AppService,
    private activatedRoute: ActivatedRoute,
    private modalCtrl: ModalController,
    private cinematicaRotacional: CinematicaRotacionalService,
    private velTrans: VelTransService,
    private speed: SpeedService,
    private interest: InterestService,
    private conversiones: ConversionesService,
    private breakeven: BreakevenService
  ) {
    this.uMedida = {};

    this.inputs = [];
  }

  ngOnInit() {
    this.app.selectedFormula$.subscribe((formula) => {
      if (formula) {
        this.formula = formula;

        // gemerar inputs
        this.formulaUnits = InputUnits[this.formula.units] as any[];
        this.generateInputs();
      } else {
        this.activatedRoute.queryParamMap.subscribe((params) => {
          const topic = params.get("topic");
          const formulaDesc = params.get("formula");

          if (topic == topics.cinematica_rotacional)
            this.formula = this.cinematicaRotacional.formulas.find((x) => x.desc == formulaDesc);
          else if (topic == topics.conversiones)
            this.formula = this.conversiones.formulas.find((x) => x.desc == formulaDesc);
          else if (topic == topics.vel_trans) this.formula = this.velTrans.formulas.find((x) => x.desc == formulaDesc);
          else if (topic == topics.speed) this.formula = this.speed.formulas.find((x) => x.desc == formulaDesc);
          else if (topic == topics.interest) this.formula = this.interest.formulas.find((x) => x.desc == formulaDesc);
          else if (topic == topics.breakeven) this.formula = this.breakeven.formulas.find((x) => x.desc == formulaDesc);

          // gemerar inputs
          this.formulaUnits = InputUnits[this.formula.units] as any[];
          this.generateInputs();
        });
      }
    });
  }

  clickSelect(e: any, name: string) {
    const select = this.selects.find((i) => i.name == name);
    select && select.open(e);
  }

  showHistory() {
    this.modalCtrl
      .create({
        component: HistoryComponent,
        backdropDismiss: true,
        cssClass: "non-top",
        keyboardClose: true,
      })
      .then((action) => {
        action.present();
      });
  }

  validateUnits(input: any) {
    //console.log("Estamos aqui");
    if (this.formula.validateComponentes != undefined) {
      if (input.name.contains("radio")) {
        input.units = this.formula.validateComponentes(input["Radio:Valor1"], input["Radio:Valor2"]);
      } else if (input.name.contains("Fuerza")) {
        input.units = this.formula.validateComponentes(input["Fuerza:Valor1"], input["Fuerza:Valor2"]);
      }
    }
  }

  seleccionarUnidades() {
    const buttons: any[] = [];

    const u = InputUnits[this.formula.units];

    // Si la formula solon tiene una sola posible unidad de salida, se procede a mostrar el resulttado
    if (!Array.isArray(u)) {
      this.unidadSalida = u[0]; //Para pasarselo a la tabla de conversion
      this.solve();
      return;
    } else if (u.length == 1) {
      this.unidadSalida = u[0]; //Para pasarselo a la tabla de conversion
      this.solve();
      return;
    } else
      for (let i = 0; i < u.length; i++) {
        buttons.push({
          text: u[i],
          handler: () => {
            this.unidadSalida = u[i]; //Para pasarselo a la tabla de conversion
            this.solve();
          },
        });
      }

    this.actionCtrl
      .create({
        header: "Unidad de medida de salida",
        buttons: buttons,
        animated: true,
        cssClass: "text-color-black",
      })
      .then((action) => {
        action.present();
      });
  }

  generateInputs() {
    var properties = this.formula.properties;

    for (let i = 0; i < properties.length; i++) {
      var dontShow: boolean;
      let input: any = {};
      input.name = properties[i].name;
      input.value = "";

      let unidades = properties[i].allowedInputUnits;
      for (let i = 0; i < unidades.length; i++) {
        dontShow = unidades[i] == "none" ? true : false;
        if (i == 0) {
          input.selectedU = InputUnits[unidades[i]][0];
        }
        input.units = [];
        input.units = input.units.concat(InputUnits[unidades[i]]);
      }
      if (!dontShow) {
        this.inputs.push(input);
      }
    }
  }

  clear() {
    this.result = 0;
    this.inputs.forEach((e) => (e.value = 0));
  }

  convertir(e) {
    this.solve();
  }

  onInputChange() {
    if (this.result) this.result = 0;
  }

  // Obtiene los datos de los inputs y devuelve un array de con ellos
  getArrayParams() {
    var params = {};
    for (let i = 0; i < this.inputs.length; i++) {
      let name = this.inputs[i].name;
      params[name] = Number.parseFloat(this.inputs[i].value);
      this.uMedida[name] = this.inputs[i].selectedU;
    }
    this.uMedida["Salida"] = this.unidadSalida;
    return params;
  }

  validarDatos() {
    for (let i = 0; i < this.inputs.length; i++) {
      if (this.inputs[i].value == "" || isNaN(this.inputs[i].value)) {
        var alert = this.alertCtrl
          .create({
            header: "Error: Campo " + this.inputs[i].name,
            subHeader: "Los datos ingresados no son admitidos",
            cssClass: "text-color-black",
            buttons: [
              {
                text: "Aceptar",
                role: "destructive",
              },
            ],
          })
          .then((alert) => {
            alert.present();
          });

        return false; //Dato invalido
      }
    }
    return true; //todos los datos son correctos
  }

  solve() {
    if (!this.validarDatos()) {
      // Si hay un dato incorrecto cancelamos la operacion
      return false;
    }
    //console.log("uMedida", this.uMedida);
    //console.log("params", this.getArrayParams());
    var params = this.getArrayParams();

    // Llamamos al metodo que resuelve el problema dandole los datos ingresados y sus respectivas unidades de medida
    var result: number = this.formula.handler(params, this.uMedida);
    //console.log("result", result);

    this.result = result;
    const dataEntries = this.generateDataEntries(params, this.uMedida);
    this.updateHistory(dataEntries);
  }

  updateHistory(dataEntries: DataEntry[]) {
    const key = "history";
    const record: HistoryRecord = {
      dataEntries,
      result: this.result,
      unidadSalida: this.unidadSalida,
      formula: {
        desc: this.formula.desc,
        note: this.formula.note,
        units: this.formula.units,
      },
    };
    let history: HistoryRecord[] = JSON.parse(localStorage.getItem(key));
    if (history) history.unshift(record);
    else history = [record];

    localStorage.setItem(key, JSON.stringify(history));
    this.history.updateHistory();
  }

  generateDataEntries(params: any, unidades: any) {
    var names = Object.getOwnPropertyNames(params); //Obtiene los nombres de los parametros
    const dataEntries = new Array<DataEntry>();
    // GEnera un array con los nombres de los parametros, su valor y su unidad
    for (let i = 0; i < names.length; i++) {
      dataEntries.push({ name: names[i], value: params[names[i]], unit: unidades[names[i]] });
    }
    return dataEntries;
  }
}
