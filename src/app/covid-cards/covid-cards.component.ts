import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Content, CovidCards } from '../models/covid-cards.model';
import { CovidCardService } from '../services/covid-card.service';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-covid-cards',
  templateUrl: './covid-cards.component.html',
  styleUrls: ['./covid-cards.component.scss']
})

export class CovidCardsComponent implements OnInit {

  estados: CovidCards[] = []
  unsubscribeAll: Subject<any>;

  constructor(private readonly service: CovidCardService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getCards()
  }

  getCards(): void {
    this.service.getCovidsData()//observable
      .pipe(takeUntil(this.unsubscribeAll)) 
      .subscribe((dados: Content<Array<CovidCards>>) => this.estados = dados.data)
  }

  verifyData() {
    if(this.estados.length===0){
      return true;
    } else{
      return false;
    }
  }

  formatValues(value: number): string {
    return value.toString()
      .replace(/(\d{1,3})(\d{3})(\d{3})/, "$1.$2.$3")
      .replace(/(\d{1,3})(\d{3})/, "$1.$2")
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}


