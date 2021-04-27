import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiondeuxComponent } from './sectiondeux.component';

describe('SectiondeuxComponent', () => {
  let component: SectiondeuxComponent;
  let fixture: ComponentFixture<SectiondeuxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectiondeuxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectiondeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
