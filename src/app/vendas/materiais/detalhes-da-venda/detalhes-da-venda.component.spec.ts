import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesDaVendaComponent } from './detalhes-da-venda.component';

describe('DetalhesDaVendaComponent', () => {
  let component: DetalhesDaVendaComponent;
  let fixture: ComponentFixture<DetalhesDaVendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesDaVendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDaVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
