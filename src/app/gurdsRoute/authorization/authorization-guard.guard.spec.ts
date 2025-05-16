import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { authorizationGuardGuard } from './authorization-guard.guard';

describe('authorizationGuardGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authorizationGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
