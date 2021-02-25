import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionIndicatorQualitatifComponent } from './position-indicator-qualitatif.component';

describe('PositionIndicatorQualitatifComponent', () => {
  let component: PositionIndicatorQualitatifComponent;
  let fixture: ComponentFixture<PositionIndicatorQualitatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionIndicatorQualitatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionIndicatorQualitatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
