import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhonePage } from './add-phone.page';

describe('AddPhonePage', () => {
  let component: AddPhonePage;
  let fixture: ComponentFixture<AddPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPhonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
