

import { FacilityService } from './facility.service';
import { TestBed, inject } from '@angular/core/testing';

describe('FacilityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacilityService]
    });
  });

  it('should be created', inject([FacilityService], (service: FacilityService) => {
    expect(service).toBeTruthy();
  }));
});
