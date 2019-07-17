
import { RoomService } from './room.service';
import { TestBed, inject } from '@angular/core/testing';

describe('RoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomService]
    });
  });

  it('should be created', inject([RoomService], (service: RoomService) => {
    expect(service).toBeTruthy();
  }));
});
