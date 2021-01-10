import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSkillGroupComponent } from './add-new-skill-group.component';

describe('AddNewSkillGroupComponent', () => {
  let component: AddNewSkillGroupComponent;
  let fixture: ComponentFixture<AddNewSkillGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSkillGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSkillGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
