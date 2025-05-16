import { Component, OnInit, inject, signal } from '@angular/core';
import { LayoutLoginCreateComponent } from '../../login-create/layout-login-create/layout-login-create.component';
import { ServiceLoginLogout } from '../../login-create/service/service-login-logout.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CreateUser } from '../../login-create/interface/createUser.interface';
import { CustomInputComponent } from '../../default/custom-input/custom-input.component';
import { filter } from 'rxjs';
import { ChangePassword } from '../../login-create/interface/changePassword.interface';

@Component({
  selector: 'app-page-recover-password',
  standalone: true,
  imports: [LayoutLoginCreateComponent, ReactiveFormsModule, CustomInputComponent],
  templateUrl: './page-recover-password.component.html',
  styleUrl: './page-recover-password.component.scss'
})
export class PageRecoverPasswordComponent implements OnInit {

  token = signal("");

  ngOnInit(): void {
    this.#route.queryParams.subscribe(params => {
      this.token.set(params['token']);
      this.form.patchValue({token : this.token()})
    });
  }

  #apiServiceCreate = inject(ServiceLoginLogout);

  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute)
  #router = inject(Router)

  form: FormGroup = this.#fb.group({
    token: [],
    password: [],
    confirmPassword: []
  })

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }
  
  submitChangePassword(){
    this.#apiServiceCreate.httpChangePassword(this.form.value as ChangePassword).subscribe(res => {
      this.#router.navigate(['/login']);
      console.log(res);
    });
  }
}
