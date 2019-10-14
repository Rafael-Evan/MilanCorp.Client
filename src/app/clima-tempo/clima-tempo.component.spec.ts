import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClimaTempoComponent } from './clima-tempo.component';

describe('ClimaTempoComponent', () => {
  let component: ClimaTempoComponent;
  let fixture: ComponentFixture<ClimaTempoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimaTempoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClimaTempoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
