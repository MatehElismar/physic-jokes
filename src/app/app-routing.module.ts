import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { topics } from "./conts";

const routes: Routes = [
  {
    path: "",
    redirectTo: `topic/${topics.interest}`,
    pathMatch: "full",
  },
  {
    path: "topic/:topic",
    loadChildren: () => import("./topic/topic.module").then((m) => m.TopicPageModule),
  },
  {
    path: 'insert-data',
    loadChildren: () => import('./insert-data/insert-data.module').then( m => m.InsertDataPageModule)
  },
  {
    path: 'results',
    loadChildren: () => import('./results/results.module').then( m => m.ResultsPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
