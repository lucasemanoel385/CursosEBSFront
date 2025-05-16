import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../../default/custom-input/custom-input.component';
import { CategoryService } from '../../service/service-category.service';
import { Category } from '../../interface/category.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-category-register',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule],
  templateUrl: './category-register.component.html',
  styleUrl: './category-register.component.scss'
})
export class CategoryRegisterComponent implements OnInit{

  ngOnInit(): void {
    this.#apiServiceCategory.httpListCategoryById(this.#router.snapshot.params['id']).pipe(take(1)).subscribe(
      res => {
        this.editCategory(res); 
        this.buttonSubmit.set("SALVAR");
      });
  }

  #router = inject(ActivatedRoute);
  #apiServiceCategory = inject(CategoryService);

  buttonSubmit = signal("CADASTRAR");

  #fb = inject(FormBuilder);

  form: FormGroup = this.#fb.group({
    id: [],
    name: []
  })

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }

  submit() {
    this.#apiServiceCategory.httpCreateCategory(this.form.value as Category).subscribe(res => console.log("cadastrado"));
    console.log(this.form.value)
  }

  //EditCategory

  private editCategory(res: Category){
    this.form.patchValue({
      id: res.id,
      name: res.name
    })
  };

  public backRouter() {
    window.history.back();
  }

  
}
