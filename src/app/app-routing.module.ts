import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidCardsComponent } from './covid-cards/covid-cards.component';

const routes: Routes = [
  {path:'cards', component: CovidCardsComponent},
  {path:'', redirectTo:"cards",pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
