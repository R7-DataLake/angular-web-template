import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthAdminService } from '../../shared/auth-admin.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthAdminService);
  return authService.isAdmin();
};
