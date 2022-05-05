import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Content, CovidCards } from '../models/covid-cards.model';
import { CovidCardService } from '../services/covid-card.service';
import { finalize, takeUntil } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Localidades } from '../shared/enums/Localidades.enum';


@Component({
  selector: 'app-covid-cards',
  templateUrl: './covid-cards.component.html',
  styleUrls: ['./covid-cards.component.scss']
})

export class CovidCardsComponent implements OnInit {

  SelectOptions: string[] = [
    Localidades.ESTADO,
    Localidades.PAIS
  ];

  isSelected: string = this.SelectOptions[0];
  loading: boolean = false; //para não começar renderizando o loading
  locations: CovidCards[] = [];
  unsubscribeAll: Subject<any>;
  isCountry: boolean = false;
  modalRef?: BsModalRef;
  localizationData!: CovidCards;
  dataFormated: Array<CovidCards> = [];

  constructor(private readonly service: CovidCardService, private modalService: BsModalService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.filterCards(this.isSelected);
  }

  filterCards(escolha: string) {
    let filter: string = '';
    if (escolha === Localidades.PAIS) {
      filter = 'countries';
      this.isCountry = true;
    } else {
      this.isCountry = false;
    }
    this.getCards(filter);
  }

  getCards(escolha: string): void {
    this.loading = true;
    this.service.getCovidsData(escolha)//observable
      .pipe(
        takeUntil(this.unsubscribeAll),
        finalize(() => this.loading = false)) // depois que termina a requisição
      .subscribe((dados: Content<Array<CovidCards>>) => {
        this.locations = dados.data;
        this.dataFormated = this.locations.map((res: any) => {
          Object.seal(res);
          return {
            ...res,
            cases: this.formatValues(res?.cases),
            deaths: this.formatValues(res?.deaths),
            suspects: this.formatValues(res?.suspects),
            refuses: this.formatValues(res?.refuses),
            confirmed: this.formatValues(res?.confirmed)
          }
        })
      });
  }

  formatValues(value: number): string {
    if (value == null) return 'Dado não encontrado.';
    return value.toString()
      .replace(/(\d{1,3})(\d{3})(\d{3})/, "$1.$2.$3")
      .replace(/(\d{1,3})(\d{3})/, "$1.$2");
  }

  openModal(template: TemplateRef<any>, local: any) {
    this.localizationData = local;
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}







