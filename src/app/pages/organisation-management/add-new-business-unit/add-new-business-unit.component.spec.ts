import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBusinessUnitComponent } from './add-new-business-unit.component';

describe('AddNewBusinessUnitComponent', () => {
  let component: AddNewBusinessUnitComponent;
  let fixture: ComponentFixture<AddNewBusinessUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBusinessUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBusinessUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
