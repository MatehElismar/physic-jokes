import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { HistoryRecord } from "src/app/models/topics.model";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-history",
  templateUrl: "./history.component.html",
  styleUrls: ["./history.component.scss"],
})
export class HistoryComponent implements OnInit {
  history = new Array<HistoryRecord>();
  @Input() table = false; //table (web) mode
  constructor(private modalController: ModalController, public app: AppService) {}

  ngOnInit() {
    const history = JSON.parse(localStorage.getItem("history"));
    if (history) this.history = history;
  }

  updateHistory() {
    const history = JSON.parse(localStorage.getItem("history"));
    if (history) this.history = history;
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
