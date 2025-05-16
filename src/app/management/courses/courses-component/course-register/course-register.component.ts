import { Instructor } from './../../../students/interface/instructor.interface';
import { ChangeDetectionStrategy, Component, DoCheck, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../../default/custom-input/custom-input.component';
import { CoursesService } from '../../service/courses.service';
import { Courses } from '../../interface/courses.interface';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../../students/service/students.service';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';
import { NgClass } from '@angular/common';
import { CategoryService } from '../../../category/service/service-category.service';
import { Category } from '../../../category/interface/category.interface';
import { catchError, concatMap, forkJoin, map, mergeMap, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-register',
  standalone: true,
  imports: [CustomInputComponent, ReactiveFormsModule, NgClass],
  templateUrl: './course-register.component.html',
  styleUrl: './course-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseRegisterComponent implements OnInit {
 
  #apiServiceCourse = inject(CoursesService);
  #apiServiceUser= inject(StudentsService);
  #apiServiceCategory = inject(CategoryService);

  getListInstructor = signal<Pageable<Instructor> | undefined>(undefined);
  getListCategory = signal<Pageable<Category> | undefined>(undefined);
  searchIns = signal("null");
  searchCat = signal("null");

  condition = signal(true);

  buttonSubmit = signal("CADASTRAR");
  idCourse = signal<string | null>(null);
  #route = inject(ActivatedRoute);
  #fb = inject(FormBuilder);

  form: FormGroup = this.#fb.group({
    id: [],
    imgURL: [],
    title: [],
    description: [],
    price: [],
    instructorName: [],
    instructorId: [],
    categoryName: [],
    categoryId: []
  });

  ngOnInit(): void {
    
  }

  constructor() {
    this.idCourse.set(this.#route.snapshot.params['id'] ?? null);
    effect(() => {
      if(this.idCourse()) {
        this.#apiServiceCourse.httpListCourseById(parseInt(this.idCourse() as string)).pipe(
          mergeMap(course => forkJoin({
            course: of(course), // Mantém os dados do curso
            category: this.#apiServiceCategory.httpListCategoryById(course.categoryId as number).pipe(catchError(() => of(null))),
            instructor: this.#apiServiceUser.httpInstructorById(course.instructorId as number).pipe(catchError(() => of(null)))
          }))
        ).subscribe(({ course, category, instructor }) => {
          console.log(course, category, instructor)
          this.editBody(course, category, instructor);
        });
      }
      this.#apiServiceUser.httpListInstructor(this.searchIns()).subscribe(res => this.getListInstructor.set(res));
      this.#apiServiceCategory.httpListCategoryWithFilter(this.searchCat()).subscribe(res => this.getListCategory.set(res))
    })
  }

  searchFilter(search: string,dropdown: HTMLElement, category: boolean) {

    if(!category) {
      if(search === '') {
        //this.searchIns.set("null");
        dropdown.style.display = "none"
      } else {
        this.searchIns.set(search);
        dropdown.style.display = "flex"
      }
    } else {
      if(search === '') {
        //this.searchIns.set("null");
        dropdown.style.display = "none"
      } else {
        this.searchCat.set(search);
        dropdown.style.display = "flex"
      }
    }
  }

  toggleDropdown(dropdown: HTMLElement) {
    setTimeout(() => {
      if(dropdown) {
        dropdown.style.display = 'none'
      }
    }, 160)
  }

  setValueInstructorForm(instructor: Instructor) {
    this.form.patchValue({
      instructorName: instructor.instructor,
      instructorId: instructor.id
    })
  }

  setValueCategoryForm(category: Category) {
    this.form.patchValue({
      categoryName: category.name,
      categoryId: category.id
    })
  }

  editBody(res: Courses, category: Category | null, instructor: Instructor | null) {
    this.buttonSubmit.set("SALVAR");
    this.form.patchValue(res);
    if(category) {
      this.form.patchValue({
        categoryId: category.id,
        categoryName: category.name
      })
    }
    if(instructor) {
      this.form.patchValue({
        instructorId: instructor.id,
        instructorName: instructor.instructor
      })
    }
  }

  getControl(name: string){
    return this.form.get(name) as FormControl;
  }

  submitCreateCourse() {
    if(this.buttonSubmit() === "SALVAR") {
      this.condition.set(false);
      this.#apiServiceCourse.httpUpdateCourse(this.form.value as Courses).subscribe(res => this.condition.set(true));
    } else {
      this.condition.set(false);
      this.#apiServiceCourse.httpCreateCourse(this.form.value as Courses).subscribe(res => this.condition.set(true));
    }
  }

  public backRouter() {
    window.history.back();
  }

}
