import { Component, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CovidCards } from 'src/app/models/covid-cards.model';
import { Localidades } from 'src/app/shared/enums/Localidades.enum';

@Component({
  selector: 'modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss']
})

export class ModalCardComponent implements OnInit {

  constructor() { }
  @Input() format!: Function;

  @Input() modalRef: BsModalRef | undefined;

  @Input() localizacaoEscolhida: any;
  @Input() choice: string = '';

  state: string = Localidades.ESTADO;

  ngOnInit(): void { }

}
