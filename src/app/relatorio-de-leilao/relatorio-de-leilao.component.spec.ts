import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioDeLeilaoComponent } from './relatorio-de-leilao.component';

describe('RelatorioDeLeilaoComponent', () => {
  let component: RelatorioDeLeilaoComponent;
  let fixture: ComponentFixture<RelatorioDeLeilaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatorioDeLeilaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatorioDeLeilaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
