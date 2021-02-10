import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIndicatorAreaComponent } from './add-new-indicator-area.component';

describe('AddNewIndicatorAreaComponent', () => {
  let component: AddNewIndicatorAreaComponent;
  let fixture: ComponentFixture<AddNewIndicatorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewIndicatorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIndicatorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
