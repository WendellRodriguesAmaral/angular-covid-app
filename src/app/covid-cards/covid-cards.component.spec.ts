import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidCardsComponent } from './covid-cards.component';

describe('CovidCardsComponent', () => {
  let component: CovidCardsComponent;
  let fixture: ComponentFixture<CovidCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
