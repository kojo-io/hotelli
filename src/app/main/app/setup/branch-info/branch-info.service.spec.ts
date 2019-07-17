
import { BranchInfoService } from './branch-info.service';
import { TestBed, inject } from '@angular/core/testing';

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
