import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authorizationGuard: CanActivateFn = (route, segments) => {

  var router = inject(Router);

  if(localStorage.getItem('tokenJWT')) {
    let role: any = (jwtDecode(localStorage.getItem('tokenJWT') as string));
    if(role.role != "ROLE_INSTRUCTOR" && role.role != "ROLE_ADMIN") {
        router.navigate(['../login'])
        return false;
    }
  } else {
    router.navigate(['../login'])
    return false;
  }
  return true;
};
