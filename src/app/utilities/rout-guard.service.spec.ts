import { TestBed, inject } from '@angular/core/testing';

import { RoutGuardService } from './rout-guard.service';

describe('RoutGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutGuardService]
    });
  });

  it('should be created', inject([RoutGuardService], (service: RoutGuardService) => {
    expect(service).toBeTruthy();
  }));
});
