import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../../default/custom-input/custom-input.component';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../service/students.service';
import { User } from '../../interface/user.interface';
import { Profile } from '../../interface/profile.interface';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';

@Component({
  selector: 'app-students-register',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule],
  templateUrl: './students-register.component.html',
  styleUrl: './students-register.component.scss'
})
export class StudentsRegisterComponent {

  getListProfile = signal<Pageable<Profile> | undefined>(undefined);

  ngOnInit(): void {
    if(this.#router.snapshot.params['id']) {
      this.#apiServiceStudents.httpListUserById(this.#router.snapshot.params['id']).subscribe(res => {this.editBodyRegister(res); this.buttonSubmit.set("SALVAR")});
    }

    this.#apiServiceStudents.httpListProfile().subscribe(res => {this.getListProfile.set(res); console.log(res)});

  }

  #apiServiceStudents = inject(StudentsService);
  #router = inject(ActivatedRoute);
  buttonSubmit = signal("CADASTRAR")
  selectProfile = signal("Selecione uma opção");
  profile = signal<Profile | null>(null);

  #fb = inject(FormBuilder);

  form: FormGroup = this.#fb.group({
    id: [],
    name: [],
    email: [],
    password: [],
    role: []
  });

  editSelected(selected: Profile) {
    this.selectProfile.set(selected.name);
    this.form.patchValue({
      role: selected.id
    })
  }

  editBodyRegister(res: User) {

    this.form.patchValue({
      id: res.id,
      name: res.name,
      email: res.email,
      password: res.password,
      role: res.role.id
    })
    this.selectProfile.set(res.role.name);
  }

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }
  
  submitUser() {
    console.log(this.form.value)
    if(this.buttonSubmit() === "SALVAR") {
      this.#apiServiceStudents.httpUpdateUser(this.form.value as User).subscribe();
    } else {
      this.#apiServiceStudents.httpCreateUser(this.form.value as User).subscribe();
    }
    
  }

  public backRouter() {
    window.history.back();
  }
}
