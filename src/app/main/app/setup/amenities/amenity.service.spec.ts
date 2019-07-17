
import { AmenityService } from './amenity.service';
import { TestBed, inject } from '@angular/core/testing';

describe('AmenityService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmenityService]
    });
  });

  it('should be created', inject([AmenityService], (service: AmenityService) => {
    expect(service).toBeTruthy();
  }));
});
