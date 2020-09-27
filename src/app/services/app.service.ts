import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Formula } from "../models/topics.model";

@Injectable({
  providedIn: "root",
})
export class AppService {
  selectedFormula = new BehaviorSubject<Formula>(null);
  selectedFormula$ = this.selectedFormula.asObservable();
  constructor() {}
}
