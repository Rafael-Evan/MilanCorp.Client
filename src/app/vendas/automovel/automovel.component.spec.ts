/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AutomovelComponent } from './automovel.component';

describe('AutomovelComponent', () => {
  let component: AutomovelComponent;
  let fixture: ComponentFixture<AutomovelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutomovelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
