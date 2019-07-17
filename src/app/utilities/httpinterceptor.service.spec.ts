import { HttpinterceptorService } from './httpinterceptor.service';
import { TestBed, inject } from '@angular/core/testing';

describe('HttpinterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpinterceptorService]
    });
  });

  it('should be created', inject([HttpinterceptorService], (service: HttpinterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
