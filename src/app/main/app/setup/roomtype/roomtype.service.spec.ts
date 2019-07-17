
import { RoomtypeService } from './roomtype.service';
import { TestBed, inject } from '@angular/core/testing';

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
