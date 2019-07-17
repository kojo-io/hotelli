
import { TaxService } from './tax.service';
import { TestBed, inject } from '@angular/core/testing';

describe('TaxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxService]
    });
  });

  it('should be created', inject([TaxService], (service: TaxService) => {
    expect(service).toBeTruthy();
  }));
});
