/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ImoveisComponent } from './imoveis.component';

describe('ImoveisComponent', () => {
  let component: ImoveisComponent;
  let fixture: ComponentFixture<ImoveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImoveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
