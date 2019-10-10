import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaDeReuniaoComponent } from './sala-de-reuniao.component';

describe('SalaDeReuniaoComponent', () => {
  let component: SalaDeReuniaoComponent;
  let fixture: ComponentFixture<SalaDeReuniaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaDeReuniaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaDeReuniaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
