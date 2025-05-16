import { Component, inject, signal } from '@angular/core';
import { PaymentService } from '../../service/PaymentService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ServicePopupService } from '../service/service-popup.service';

@Component({
  selector: 'app-enroll',
  standalone: true,
  imports: [],
  templateUrl: './enroll.component.html',
  styleUrl: './enroll.component.scss'
})
export class EnrollComponent {

  //profile = jwtDecode(localStorage.getItem("tokenJWT") === "RENEW" || localStorage.getItem("role") === null ? true : false;
  profile = signal<any | string>('');
  #router = inject(Router);
  popup = inject(ServicePopupService);

  #paymentService = inject(PaymentService);

  constructor() {
    if(localStorage.getItem("tokenJWT")) {
      this.profile.set(jwtDecode(localStorage.getItem("tokenJWT") as string));
    }
  }

  pay() {
    if(!localStorage.getItem("tokenJWT")) {
      this.popup.show("Por favor entre com sua conta ou cadastre.")
      this.#router.navigate(['/login']);
    } else {
      this.#paymentService.createPreference(localStorage.getItem('id') as string).subscribe(initPoint => {
        window.location.href = initPoint.url;
        console.log(initPoint);
      });
    }
  }
}
