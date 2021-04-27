import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionunComponent } from './sectionun.component';

describe('SectionunComponent', () => {
  let component: SectionunComponent;
  let fixture: ComponentFixture<SectionunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
