import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Formula } from "../models/topics.model";
import { Location } from "@angular/common";
import { AppService } from "../services/app.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.page.html",
  styleUrls: ["./results.page.scss"],
})
export class ResultsPage implements OnInit {
  formula: Formula;
  result: string;
  data: any[];
  unidadSalida: string;
  constructor(private app: AppService, private route: ActivatedRoute, private _location: Location) {
    this.data = [];
  }

  ngOnInit() {
    this.app.selectedFormula$.subscribe((formula) => {
      this.formula = formula;
    });
    this.route.queryParamMap.subscribe((queryParams) => {
      this.result = queryParams.get("result");
      this.unidadSalida = queryParams.get("unidadSalida");
      const params = JSON.parse(queryParams.get("params"));
      const unidades = JSON.parse(queryParams.get("unidades"));
      this.generateData(params, unidades);
    });
  }

  generateData(params: any, unidades: any) {
    var names = Object.getOwnPropertyNames(params); //Obtiene los nombres de los parametros

    // GEnera un array con los nombres de los parametros, su valor y su unidad
    for (let i = 0; i < names.length; i++) {
      this.data.push({ name: names[i], value: params[names[i]], unidad: unidades[names[i]] });
    }
  }

  goHome() {
    this._location.back();
  }
}
