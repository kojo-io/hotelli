import { BaseService } from './base.service';
import { TestBed, inject } from '@angular/core/testing';

describe('BaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BaseService]
    });
  });

  it('should be created', inject([BaseService], (service: BaseService) => {
    expect(service).toBeTruthy();
  }));
});
