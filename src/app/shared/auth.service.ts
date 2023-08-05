import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor (private router: Router) { }

  isLogged() {
    const token: any = sessionStorage.getItem('token');
    if (_.isEmpty(token)) {
      return this.router.navigate(['/login']);
    }

    // is expired?
    const isExpired = this.jwtHelper.isTokenExpired(token);

    if (isExpired) {
      return this.router.navigate(['/login']);
    }

    return true;
  }

}
