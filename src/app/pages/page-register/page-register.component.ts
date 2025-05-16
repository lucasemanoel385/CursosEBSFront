import { Component, inject } from '@angular/core';
import { CustomInputComponent } from '../../default/custom-input/custom-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LayoutLoginCreateComponent } from '../../login-create/layout-login-create/layout-login-create.component';
import { ServiceLoginLogout } from '../../login-create/service/service-login-logout.service';
import { Router } from '@angular/router';
import { CreateUser } from '../../login-create/interface/createUser.interface';

@Component({
  selector: 'app-page-register',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, LayoutLoginCreateComponent],
  templateUrl: './page-register.component.html',
  styleUrl: './page-register.component.scss'
})
export class PageRegisterComponent {

  #apiServiceCreate = inject(ServiceLoginLogout);

  #fb = inject(FormBuilder);
  #router = inject(Router)

  form: FormGroup = this.#fb.group({
    name: [],
    email: [,Validators.email],
    password: []
  })

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }
  
  submitCreate(){
    this.#apiServiceCreate.httpCreateUser(this.form.value as CreateUser).subscribe(res => {
      //localStorage.setItem("tokenJWT", res.tokenJWT);
      //localStorage.setItem("role", res.authorities.name);
      //localStorage.setItem("name", res.name);
      this.#router.navigate(['/login']);
      console.log(res);
    });
  }

}
