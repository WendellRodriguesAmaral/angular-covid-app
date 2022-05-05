import { Component, EventEmitter, OnInit,Output,TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Content, CovidCards } from '../models/covid-cards.model';
import { CovidCardService } from '../services/covid-card.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


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
  isCountry:boolean = false;
  modalRef?: BsModalRef;
  event:EventEmitter<any> = new EventEmitter();

  testeSujo:any;
  dataFormated:Array<any>=[];
  
  constructor(private readonly service: CovidCardService,private modalService: BsModalService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterCards(this.isSelected)
  }

  filterCards(escolha:string){
    let filter:string='';    
    if(escolha==="Por país") {
      filter = 'countries'; 
      this.isCountry=true; 
    }else{
      this.isCountry=false;
    }
    this.getCards(filter)
  }

  getCards(escolha:string): void {   
    this.loading=true;
    this.service.getCovidsData(escolha)//observable
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(()=>this.loading=false) ) // depois que termina a requisição
      .subscribe((dados: Content<Array<CovidCards>>) => {
            this.localizacoes = dados.data

            this.dataFormated = this.localizacoes.map((res:any)=>{  
              
              if (escolha === "countries"){ //angela falou de 1 retorno so, se ela falou então da pra fazer (ternario)
                return{
                  ...res,
                  cases: this.formatValues(res?.cases ),
                  deaths: this.formatValues(res?.deaths),
                  confirmed: this.formatValues(res?.confirmed)                  
                }   
              } else{
                return {
                  ...res,
                  cases: this.formatValues(res?.cases ),
                  deaths: this.formatValues(res?.deaths),
                  suspects: this.formatValues(res?.suspects),
                  refuses: this.formatValues(res?.refuses)     

                }
              }               
            } )
      });     
  }

  formatValues(value: number): string { //pode ser um PIPE
     
    if(value == null) return 'Dado não encontrado.';
    return value.toString()
      .replace(/(\d{1,3})(\d{3})(\d{3})/, "$1.$2.$3")
      .replace(/(\d{1,3})(\d{3})/, "$1.$2")
  }

  openModal(template: TemplateRef<any> , content:any) {
    this.testeSujo=content;
    this.modalRef = this.modalService.show(template);
  }

  closeModal(){
    this.modalService.hide()
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}







