import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryComponent } from "./history/history.component";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [HistoryComponent],
})
export class ComponentsModule {}
