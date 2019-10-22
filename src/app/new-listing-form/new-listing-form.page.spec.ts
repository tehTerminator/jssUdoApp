import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListingFormPage } from './new-listing-form.page';

describe('NewListingFormPage', () => {
  let component: NewListingFormPage;
  let fixture: ComponentFixture<NewListingFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewListingFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewListingFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
