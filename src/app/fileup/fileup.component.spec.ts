/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FileupComponent } from './fileup.component';

describe('FileupComponent', () => {
  let component: FileupComponent;
  let fixture: ComponentFixture<FileupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
