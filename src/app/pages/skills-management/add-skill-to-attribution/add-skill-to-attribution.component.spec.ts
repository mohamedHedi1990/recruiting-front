import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSkillToAttributionComponent } from './add-skill-to-attribution.component';

describe('AddSkillToAttributionComponent', () => {
  let component: AddSkillToAttributionComponent;
  let fixture: ComponentFixture<AddSkillToAttributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSkillToAttributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSkillToAttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
