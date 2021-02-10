import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewIndicatorPerformanceComponent } from './add-new-indicator-performance.component';

describe('AddNewIndicatorPerformanceComponent', () => {
  let component: AddNewIndicatorPerformanceComponent;
  let fixture: ComponentFixture<AddNewIndicatorPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewIndicatorPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewIndicatorPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
