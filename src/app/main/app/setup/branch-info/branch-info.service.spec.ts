import { TestBed, inject } from '@angular/core/testing';

import { BranchInfoService } from './branch-info.service';

describe('BranchInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BranchInfoService]
    });
  });

  it('should be created', inject([BranchInfoService], (service: BranchInfoService) => {
    expect(service).toBeTruthy();
  }));
});
