import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuisnessUnitListComponent } from './buisness-unit-list.component';

describe('BuisnessUnitListComponent', () => {
  let component: BuisnessUnitListComponent;
  let fixture: ComponentFixture<BuisnessUnitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuisnessUnitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuisnessUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
