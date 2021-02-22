import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionListTableComponent } from './position-list-table.component';

describe('PositionListTableComponent', () => {
  let component: PositionListTableComponent;
  let fixture: ComponentFixture<PositionListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
