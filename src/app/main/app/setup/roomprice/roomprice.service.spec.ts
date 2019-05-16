import { TestBed, inject } from '@angular/core/testing';

import { RoompriceService } from './roomprice.service';

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
