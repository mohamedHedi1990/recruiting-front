import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobWeightListComponent } from './job-weight-list.component';

describe('JobWeightListComponent', () => {
  let component: JobWeightListComponent;
  let fixture: ComponentFixture<JobWeightListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobWeightListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobWeightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
