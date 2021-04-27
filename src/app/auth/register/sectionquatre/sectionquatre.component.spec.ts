import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionquatreComponent } from './sectionquatre.component';

describe('SectionquatreComponent', () => {
  let component: SectionquatreComponent;
  let fixture: ComponentFixture<SectionquatreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionquatreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionquatreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
