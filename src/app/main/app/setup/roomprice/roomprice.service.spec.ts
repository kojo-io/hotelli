
import { RoompriceService } from './roomprice.service';
import { TestBed, inject } from '@angular/core/testing';

describe('RoompriceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoompriceService]
    });
  });

  it('should be created', inject([RoompriceService], (service: RoompriceService) => {
    expect(service).toBeTruthy();
  }));
});
