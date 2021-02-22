import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionListTreeComponent } from './position-list-tree.component';

describe('PositionListTreeComponent', () => {
  let component: PositionListTreeComponent;
  let fixture: ComponentFixture<PositionListTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionListTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionListTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
