import { Pageable } from './../../../../default/paginator/interface/pageable.interface';
import { Courses } from './../../../courses/interface/courses.interface';
import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '../../../../default/custom-input/custom-input.component';
import { LessonService } from '../../service/lesson.service';
import { Lesson } from '../../interface/lesson.interface';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../../courses/service/courses.service';

@Component({
  selector: 'app-lessson-register',
  standalone: true,
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './lessson-register.component.html',
  styleUrl: './lessson-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LesssonRegisterComponent {

  #router = inject(ActivatedRoute);
  #fb = inject(FormBuilder);

  #apiServiceLesson = inject(LessonService);
  #apiServiceCourse = inject(CoursesService);

  searchCourse = signal("null");
  idEdit = signal<string | null>(null);
  buttonSubmit = signal("CADASTRAR");
  getListCoursesFilter = signal<Pageable<Courses> | undefined>(undefined);

  condition = signal(true);

  selectedFile: File | null = null;

  form: FormGroup = this.#fb.group({
    id: [],
    courseId: [],
    courseName: [],
    title: [''],
    description: [''],
    videoUrl: [''],
    duration: [],
    position: []
  });

  constructor() {
    this.idEdit.set(this.#router.snapshot.params['id'] ?? null);

    effect(() => {
      const id = this.idEdit();
      if (id) {
        this.#apiServiceLesson.httpListLessonById(parseInt(id)).subscribe(res => this.editBodyRegister(res));
      }
      this.#apiServiceCourse.httpListCourseByParam(this.searchCourse()).subscribe(res => this.getListCoursesFilter.set(res))
    });
  }

  searchFilter(search: string, dropdown: HTMLElement) {
    if(search === '') {
      dropdown.style.display = "none"
    } else {
      this.searchCourse.set(search);
      dropdown.style.display = "flex"
    }
  }

  toggleDropdown(dropdown: HTMLElement) {
    setTimeout(() => {
      if(dropdown) {
        dropdown.style.display = 'none'
      }
    }, 160)
  }

  setValueInstructorForm(course: Courses) {
    this.form.patchValue({
      courseName: course.title,
      courseId: course.id
    })
  }

  editBodyRegister(res: Lesson) {
    this.buttonSubmit.set("SALVAR");
    this.form.patchValue(res);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  submitCreateLesson() {

    if(this.buttonSubmit() === "SALVAR") {
      this.condition.set(false);
      this.#apiServiceLesson.httpUpdateLesson(this.form.value as Lesson).subscribe(res => this.condition.set(true));
      this.condition.set(true)
    } else {
      this.condition.set(false);
      this.#apiServiceLesson.httpCreateLesson(this.form.value as Lesson, this.selectedFile as File).subscribe(res => this.condition.set(true));
      this.condition.set(true)
    }
  }

  public backRouter() {
    window.history.back();
  }

}
