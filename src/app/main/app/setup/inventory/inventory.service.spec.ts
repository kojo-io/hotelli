
import { InventoryService } from './inventory.service';
import { TestBed, inject } from '@angular/core/testing';

describe('InventoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InventoryService]
    });
  });

  it('should be created', inject([InventoryService], (service: InventoryService) => {
    expect(service).toBeTruthy();
  }));
});
