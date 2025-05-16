import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ServicePopupService } from '../../default/service/service-popup.service';

export const authorizationAdminGuard: CanActivateFn = (route, state) => {

  var popup = inject(ServicePopupService);

  if(localStorage.getItem('tokenJWT')) {
    let role: any = (jwtDecode(localStorage.getItem('tokenJWT') as string));
    if(role.role != "ROLE_ADMIN") {
        popup.show("Sem autorização!!!");
        //router.navigate(['../login'])
        console.log("nao autorizado")
        return false;
    }
  }

  return true;
};
