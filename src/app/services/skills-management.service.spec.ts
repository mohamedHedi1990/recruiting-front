import { TestBed } from '@angular/core/testing';

import { SkillsManagementService } from './skills-management.service';

describe('SkillsManagementService', () => {
  let service: SkillsManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
