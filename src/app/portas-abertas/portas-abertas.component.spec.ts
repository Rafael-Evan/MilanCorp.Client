import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortasAbertasComponent } from './portas-abertas.component';

describe('PortasAbertasComponent', () => {
  let component: PortasAbertasComponent;
  let fixture: ComponentFixture<PortasAbertasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortasAbertasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortasAbertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
