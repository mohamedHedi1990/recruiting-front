import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionOrganigrammeComponent } from './position-organigramme.component';

describe('PositionOrganigrammeComponent', () => {
  let component: PositionOrganigrammeComponent;
  let fixture: ComponentFixture<PositionOrganigrammeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionOrganigrammeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionOrganigrammeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
