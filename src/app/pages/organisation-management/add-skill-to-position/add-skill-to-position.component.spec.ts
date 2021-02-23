import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillToPositionComponent } from './add-skill-to-position.component';

describe('AddSkillToPositionComponent', () => {
  let component: AddSkillToPositionComponent;
  let fixture: ComponentFixture<AddSkillToPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillToPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillToPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
