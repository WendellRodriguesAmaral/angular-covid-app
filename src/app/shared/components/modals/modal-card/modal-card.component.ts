import { Component, Input, OnInit,TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CovidCards } from 'src/app/models/covid-cards.model';
@Component({
  selector: 'modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})
export class ModalCardComponent implements OnInit {

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService) {}
  @Input() localizacaoModal!:CovidCards;
  @Input() format!: Function;


  ngOnInit(): void {
    console.log(this.localizacaoModal)
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


}
