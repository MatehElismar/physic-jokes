import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { topics } from "../conts";
import { Formula, SuperTopic } from "../models/topics.model";
import { AppService } from "../services/app.service";
import { CinematicaRotacionalService } from "../services/cinematica-rotacional.service";
import { ConversionesService } from "../services/conversiones.service";
import { InterestService } from "../services/interest.service";
import { SpeedService } from "../services/speed.service";
import { VelTransService } from "../services/vel-trans.service";

@Component({
  selector: "app-topic",
  templateUrl: "./topic.page.html",
  styleUrls: ["./topic.page.scss"],
})
export class TopicPage implements OnInit {
  topic: SuperTopic;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private app: AppService,
    private cinematicaRotacional: CinematicaRotacionalService,
    private velTrans: VelTransService,
    private speed: SpeedService,
    private interest: InterestService,
    private conversiones: ConversionesService
  ) {}

  ngOnInit() {
    const topic = this.activatedRoute.snapshot.paramMap.get("topic");
    if (topic == topics.cinematica_rotacional)
      this.topic = new SuperTopic(this.cinematicaRotacional.name, this.cinematicaRotacional.formulas);
    else if (topic == topics.conversiones)
      this.topic = new SuperTopic(this.conversiones.name, this.conversiones.formulas);
    else if (topic == topics.vel_trans) this.topic = new SuperTopic(this.velTrans.name, this.velTrans.formulas);
    else if (topic == topics.speed) this.topic = new SuperTopic(this.speed.name, this.speed.formulas);
    else if (topic == topics.interest) this.topic = new SuperTopic(this.interest.name, this.interest.formulas);
  }

  selectFormula(formula: Formula) {
    this.app.selectedFormula.next(formula);
    this.router.navigate(["/insert-data"], {});
  }
}
