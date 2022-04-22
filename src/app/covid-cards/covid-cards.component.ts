import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Content, CovidCards } from '../models/covid-cards.model';
import { CovidCardService } from '../services/covid-card.service';
import { finalize, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-covid-cards',
  templateUrl: './covid-cards.component.html',
  styleUrls: ['./covid-cards.component.scss']
})

export class CovidCardsComponent implements OnInit {

  options:string[]=[
    "Por estado",
    "Por país"
  ] 

  isSelected:string=this.options[0];
  loading:boolean = false; //para não começar renderizando o loading
  localizacoes: CovidCards[] = []
  unsubscribeAll: Subject<any>;
  
  constructor(private readonly service: CovidCardService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterCards(this.isSelected)
  }

  filterCards(escolha:string){
    let filter:string='';    
    if(escolha==="Por país") filter = 'countries';  
    this.getCards(filter)
  }

  getCards(escolha:string): void {   
    this.loading=true;
    this.service.getCovidsData(escolha)//observable
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(()=>this.loading=false) ) // depois que termina a requisição
      .subscribe((dados: Content<Array<CovidCards>>) => this.localizacoes = dados.data)
  }


  formatValues(value: number): string {
    if(value== null) return 'Dado não encontrado.';
    return value.toString()
      .replace(/(\d{1,3})(\d{3})(\d{3})/, "$1.$2.$3")
      .replace(/(\d{1,3})(\d{3})/, "$1.$2")
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}


