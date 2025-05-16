import { map, timeInterval, timeout } from 'rxjs';
import { AfterViewInit, Component, Input, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../../management/courses/service/courses.service';
import { Courses } from '../../management/courses/interface/courses.interface';
import { EnrollComponent } from '../../default/enroll/enroll.component';
import { Pageable } from '../../default/paginator/interface/pageable.interface';
import { Lesson } from '../../management/lesson/interface/lesson.interface';
import { EnrollService } from '../service/enroll.service';
import { CommonModule } from '@angular/common';
import { FormatDatePipe } from '../pipe/format-date.pipe';
import { jwtDecode } from 'jwt-decode';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LessonService } from '../../management/lesson/service/lesson.service';


@Component({
  selector: 'app-courses-id',
  standalone: true,
  imports: [EnrollComponent,CommonModule, FormatDatePipe],
  templateUrl: './courses-id.component.html',
  styleUrl: './courses-id.component.scss'
})
export class CoursesIdComponent implements AfterViewInit {
  
  @Input() videoUrl: string = '';

  ngAfterViewInit() {
    // Inicializa o Gumlet Player
    if ((window as any).Gumlet) {
      (window as any).Gumlet.load();
    }
  }

  #apiServiceCouser = inject(CoursesService);
  #apiServiceEnrollment = inject(EnrollService);
  #apiServiceLesson = inject(LessonService);
  #route = inject(ActivatedRoute);
  #sanitizer = inject(DomSanitizer);

  profile = signal<any | string>('');
  enrolled = signal(false);

  quantityEnrolled = signal(0);

  idCourse = signal<string | null>(null);

  getCourse = signal<Courses | undefined>(undefined);

  getListLessons = signal<Lesson[] | undefined>(undefined);

  constructor() {
    this.idCourse.set(this.#route.snapshot.params['id']);

    if(localStorage.getItem('tokenJWT')) {
      this.profile.set(jwtDecode(localStorage.getItem('tokenJWT') as string));
    }

    this.#apiServiceCouser.httpListCourseById(
      parseInt(this.idCourse() as string)).subscribe(res => {
        this.getCourse.set(res); 
        this.getListLessons.set(
          res.lessons
          .sort((a, b) => a.position - b.position)
        )
        if(this.profile().role != "ROLE_RENEW" && this.profile() != '') {
          this.#apiServiceLesson.httpListLessonByCourseId(parseInt(this.idCourse() as string)).subscribe(res => this.getListLessons.set(
            res.sort((a, b) => a.position - b.position)
    
          ));
        }
      });

    this.#apiServiceEnrollment.httpQuantityUserEnrolled$().subscribe(res => this.quantityEnrolled.set(res));

    this.#apiServiceEnrollment.httpCheckIfStudentIsEnrolledTheCourse$(
      parseInt(localStorage.getItem("id") as string), 
      parseInt(this.idCourse() as string)).subscribe(res => this.enrolled.set(res));
  }

  sanitizeUrl(assetId: string): SafeResourceUrl {

   console.log(assetId)

    return this.#sanitizer.bypassSecurityTrustResourceUrl(
      `https://play.gumlet.io/embed/${assetId}`
    );
  }

  enrolledCourse() {

    this.#apiServiceEnrollment.httpSignUpCourse$(
      parseInt(localStorage.getItem("id") as string), 
      this.getCourse()?.id as number).subscribe(() => this.enrolled.set(true));

  }

  isIframeOpen: { [key: number]: boolean } = {}; // Objeto para armazenar o estado de cada iframe

  toggleIframe(i: number) {
      // isFrame recebe o number do frame indicando seu estado com true or false
      this.isIframeOpen[i] = !this.isIframeOpen[i];

  }

}
