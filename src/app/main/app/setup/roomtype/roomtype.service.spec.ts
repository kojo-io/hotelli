import { TestBed, inject } from '@angular/core/testing';

import { RoomtypeService } from './roomtype.service';

describe('RoomtypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomtypeService]
    });
  });

  it('should be created', inject([RoomtypeService], (service: RoomtypeService) => {
    expect(service).toBeTruthy();
  }));
});
