import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorAreaComponent } from './indicator-area.component';

describe('IndicatorAreaComponent', () => {
  let component: IndicatorAreaComponent;
  let fixture: ComponentFixture<IndicatorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
