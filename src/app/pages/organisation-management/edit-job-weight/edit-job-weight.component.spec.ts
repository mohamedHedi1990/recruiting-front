import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditJobWeightComponent } from './edit-job-weight.component';

describe('EditJobWeightComponent', () => {
  let component: EditJobWeightComponent;
  let fixture: ComponentFixture<EditJobWeightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditJobWeightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditJobWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
