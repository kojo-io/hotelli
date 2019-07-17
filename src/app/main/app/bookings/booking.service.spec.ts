
import { BookingService } from './booking.service';
import { TestBed, inject } from '@angular/core/testing';

describe('BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingService]
    });
  });

  it('should be created', inject([BookingService], (service: BookingService) => {
    expect(service).toBeTruthy();
  }));
});
