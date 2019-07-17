
import { RouteGuard } from './rout-guard.service';
import { TestBed, inject } from '@angular/core/testing';

describe('RoutGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [RouteGuard]
    });
  });

    it('should be created', inject([RouteGuard], (service: RouteGuard) => {
    expect(service).toBeTruthy();
  }));
});
