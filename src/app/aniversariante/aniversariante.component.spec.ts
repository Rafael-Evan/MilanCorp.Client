import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AniversarianteComponent } from './aniversariante.component';

describe('AniversarianteComponent', () => {
  let component: AniversarianteComponent;
  let fixture: ComponentFixture<AniversarianteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniversarianteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AniversarianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
