import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityFormPage } from './city-form.page';

describe('CityFormPage', () => {
  let component: CityFormPage;
  let fixture: ComponentFixture<CityFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
