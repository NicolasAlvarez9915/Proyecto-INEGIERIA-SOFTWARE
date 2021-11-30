import { TestBed } from '@angular/core/testing';

import { AuthPerfilDomiciliarioGuard } from './auth-perfil-domiciliario.guard';

describe('AuthPerfilDomiciliarioGuard', () => {
  let guard: AuthPerfilDomiciliarioGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPerfilDomiciliarioGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
