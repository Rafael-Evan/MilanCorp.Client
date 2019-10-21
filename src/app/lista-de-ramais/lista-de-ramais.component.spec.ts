import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeRamaisComponent } from './lista-de-ramais.component';

describe('ListaDeRamaisComponent', () => {
  let component: ListaDeRamaisComponent;
  let fixture: ComponentFixture<ListaDeRamaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeRamaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeRamaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
