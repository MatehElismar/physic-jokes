import { Component, OnInit } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { topics } from "./conts";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  selectedIndex = 0;

  // used for an example of ngFor and navigation
  topics = [
    // { title: 'Home', component: HomePage },
    { title: "Intereses", url: `/topic/${topics.interest}`, icon: "heart" },
    { title: "Velocidad Transaccional", url: `/topic/${topics.vel_trans}`, icon: "heart" },
    { title: "Velocidad Angular", url: `/topic/${topics.speed}`, icon: "heart" },
    { title: "Cinematica Rotacional", url: `/topic/${topics.cinematica_rotacional}`, icon: "heart" },
    { title: "Conversiones", url: `/topic/${topics.conversiones}`, icon: "heart" },
  ];

  labels = ["Family", "Friends", "Notes", "Work", "Travel", "Reminders"];

  constructor(private platform: Platform, private splashScreen: SplashScreen, private statusBar: StatusBar) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split("topic/")[1];
    if (path !== undefined) {
      this.selectedIndex = this.topics.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
