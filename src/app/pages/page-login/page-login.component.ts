import { Component, OnInit, inject, signal } from '@angular/core';
import { CustomInputComponent } from '../../default/custom-input/custom-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutLoginCreateComponent } from '../../login-create/layout-login-create/layout-login-create.component';
import { Router } from '@angular/router';
import { ServiceLoginLogout } from '../../login-create/service/service-login-logout.service';
import { LoginUser } from '../../login-create/interface/loginUser.interface';
import { ServicePopupService } from '../../default/service/service-popup.service';

@Component({
  selector: 'app-page-login',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, LayoutLoginCreateComponent],
  templateUrl: './page-login.component.html',
  styleUrl: './page-login.component.scss'
})
export class PageLoginComponent implements OnInit {

  ngOnInit(): void {
    localStorage.clear();
  }

  #apiServiceCreate = inject(ServiceLoginLogout);
  #fb = inject(FormBuilder);
  #router = inject(Router);

  getControlvalue = signal('');

  form: FormGroup = this.#fb.group({
    username: [],
    password: []
  })

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }

  submitLogin(){
    this.#apiServiceCreate.httpLoginUser(this.form.value as LoginUser).subscribe(res => {
      localStorage.setItem("tokenJWT", res.tokenJWT);
      localStorage.setItem("role", res.authorities[0].name);
      localStorage.setItem("name", res.name);
      localStorage.setItem("id", res.id.toString());
      this.#router.navigate(['']);
    });
  }

  register() {
    this.#router.navigate(["/register"]);
  }

  submitResetPassword() {
    this.getControl("username").value;
    this.#apiServiceCreate.httpResetPassword(this.getControl("username").value).subscribe(res => console.log(res));
  }

}
