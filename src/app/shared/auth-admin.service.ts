import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor (private router: Router) { }

  isAdmin() {
    const token: any = sessionStorage.getItem('token')
    const decoded = this.jwtHelper.decodeToken(token);
    // is expired?
    const isExpired = this.jwtHelper.isTokenExpired(token);

    if (isExpired) {
      return this.router.navigate(['/login']);
    }

    const isAdmin = decoded.role.includes('ADMIN');

    if (isAdmin) {
      return true;
    } else {
      return this.router.navigate(['/denied']);
    }
  }

}
