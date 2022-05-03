import { Component, EventEmitter, Input, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CovidCards } from 'src/app/models/covid-cards.model';

@Component({
  selector: 'modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})

export class ModalCardComponent implements OnInit {

  
  
  constructor(private modalService: BsModalService) {}
  @Input() localizacaoModal!:CovidCards;
  @Input() format!: Function;
  
  @Input() modalRef: BsModalRef | undefined;
  @Input() close!: Function;

  @Input() event:any;
  @Input() escolha:string='';

  localizacaoAsArray:Array<any>=[];

  ngOnInit(): void {
      console.log(this.localizacaoModal);
      console.log(this.event);
      
  }


 

}
