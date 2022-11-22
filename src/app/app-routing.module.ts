import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidCardsComponent } from './covid-cards/covid-cards.component';

const routes: Routes = [
  {path:'', redirectTo:"cards",pathMatch:"full"},
  {path:'cards', component: CovidCardsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
