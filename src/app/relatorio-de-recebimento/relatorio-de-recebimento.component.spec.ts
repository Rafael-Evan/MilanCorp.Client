import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeRecebimentoComponent } from './relatorio-de-recebimento.component';

describe('RelatorioDeRecebimentoComponent', () => {
  let component: RelatorioDeRecebimentoComponent;
  let fixture: ComponentFixture<RelatorioDeRecebimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDeRecebimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDeRecebimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
