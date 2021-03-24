import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionFunctionSheetComponent } from './position-function-sheet.component';

describe('PositionFunctionSheetComponent', () => {
  let component: PositionFunctionSheetComponent;
  let fixture: ComponentFixture<PositionFunctionSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionFunctionSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionFunctionSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
