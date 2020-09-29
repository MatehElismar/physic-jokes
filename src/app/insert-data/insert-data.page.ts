import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ActionSheetController, AlertController } from "@ionic/angular";
import { Formula } from "../models/topics.model";
import { ConversionesService, InputUnits } from "../services/conversiones.service";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-insert-data",
  templateUrl: "./insert-data.page.html",
  styleUrls: ["./insert-data.page.scss"],
})
export class InsertDataPage implements OnInit {
  formula: Formula;
  uMedida: any;
  unidadSalida: string;
  inputs: any[];

  constructor(
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    private router: Router,
    private app: AppService,
    private _location: Location,
    private route: ActivatedRoute
  ) {
    this.uMedida = {};

    this.inputs = [];
  }

  ngOnInit() {
    this.app.selectedFormula$.subscribe((formula) => {
      if (formula) {
        this.formula = formula;
        this.generateInputs();
      } else {
        this.alertCtrl
          .create({
            header: "Error",
            subHeader: "Necesito una formula",
            buttons: ["Ok"],
          })
          .then((a) => {
            a.present();
            a.onDidDismiss().then(() => this._location.back());
          });
      }
    });
  }

  validateUnits(input: any) {
    console.log("Estamos aqui");
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
    }

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
    console.log("uMedida", this.uMedida);
    console.log("params", this.getArrayParams());
    var params = this.getArrayParams();

    // Llamamos al metodo que resuelve el problema dandole los datos ingresados y sus respectivas unidades de medida
    var result: number = this.formula.handler(params, this.uMedida);
    console.log("result", result);

    // Mostramos la pagina de resultados pasandole la formula, el resultado y los datos ingresados
    this.router.navigate(["results/"], {
      queryParams: {
        result: result,
        params: JSON.stringify(params),
        unidades: JSON.stringify(this.uMedida),
        unidadSalida: JSON.stringify(this.unidadSalida),
      },
    });
  }
}
