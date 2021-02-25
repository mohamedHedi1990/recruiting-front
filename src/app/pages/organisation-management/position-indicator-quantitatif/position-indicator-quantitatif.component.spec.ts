import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionIndicatorQuantitatifComponent } from './position-indicator-quantitatif.component';

describe('PositionIndicatorQuantitatifComponent', () => {
  let component: PositionIndicatorQuantitatifComponent;
  let fixture: ComponentFixture<PositionIndicatorQuantitatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionIndicatorQuantitatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionIndicatorQuantitatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
