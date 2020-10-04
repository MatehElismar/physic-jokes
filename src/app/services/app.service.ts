import { Injectable } from "@angular/core";
import { Clipboard } from "@capacitor/core";
import { ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { Formula } from "../models/topics.model";

@Injectable({
  providedIn: "root",
})
export class AppService {
  selectedFormula = new BehaviorSubject<Formula>(null);
  selectedFormula$ = this.selectedFormula.asObservable();
  constructor(private toastController: ToastController) {}

  async copyResult(result: number) {
    await Clipboard.write({ string: result.toString() });
    const toast = await this.toastController.create({
      animated: true,
      message: "Valor Copiado: " + result,
      duration: 3000,
    });

    toast.present();
  }
}
