import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectiontroisComponent } from './sectiontrois.component';

describe('SectiontroisComponent', () => {
  let component: SectiontroisComponent;
  let fixture: ComponentFixture<SectiontroisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectiontroisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectiontroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
