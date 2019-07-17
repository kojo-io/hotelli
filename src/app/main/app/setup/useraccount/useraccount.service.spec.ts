import { UseraccountService } from './useraccount.service';
import { TestBed, inject } from '@angular/core/testing';

describe('UseraccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UseraccountService]
    });
  });

  it('should be created', inject([UseraccountService], (service: UseraccountService) => {
    expect(service).toBeTruthy();
  }));
});
