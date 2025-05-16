import { TestBed } from '@angular/core/testing';
import { ServiceLoginLogout } from './service-login-logout.service';



describe('ServiceLoginLogoutService', () => {
  let service: ServiceLoginLogout;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLoginLogout);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
