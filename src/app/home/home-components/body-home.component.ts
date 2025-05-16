import { Component, inject, effect, signal } from '@angular/core';
import { PaymentService } from '../../service/PaymentService.service';
import { Router, RouterLink } from '@angular/router';
import { EnrollComponent } from '../../default/enroll/enroll.component';
import { CoursesService } from '../../management/courses/service/courses.service';
import { Pageable } from '../../default/paginator/interface/pageable.interface';
import { Courses } from '../../management/courses/interface/courses.interface';

@Component({
  selector: 'app-body-home',
  standalone: true,
  imports: [EnrollComponent, RouterLink],
  templateUrl: './body-home.component.html',
  styleUrl: './body-home.component.scss'
})
export class BodyHomeComponent {

  #serviceCourses = inject(CoursesService);
  getListCourses = signal<Pageable<Courses> | undefined>(undefined);
  constructor() {
    
    effect(() => {
      this.#serviceCourses.httpListCourse().subscribe(res => {this.getListCourses.set(res)})
    })
  }

}
