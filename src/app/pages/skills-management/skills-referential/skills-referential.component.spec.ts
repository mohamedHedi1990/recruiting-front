import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsReferentialComponent } from './skills-referential.component';

describe('SkillsReferentialComponent', () => {
  let component: SkillsReferentialComponent;
  let fixture: ComponentFixture<SkillsReferentialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillsReferentialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsReferentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
