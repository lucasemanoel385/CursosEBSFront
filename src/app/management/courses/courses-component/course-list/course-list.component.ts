import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { ListDefaultComponent } from '../../../../management-default/list-default/list-default.component';
import { CoursesService } from '../../service/courses.service';
import { PaginatorComponent } from '../../../../default/paginator/paginator.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';
import { Courses } from '../../interface/courses.interface';
import { RouterLink } from '@angular/router';
import { DialogComponent } from '../../../../management-default/dialog/dialog.component';
import { startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [ListDefaultComponent, PaginatorComponent, RouterLink, DialogComponent],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.scss'
})
export class CourseListComponent {

  #apiCourseService = inject(CoursesService);

  numberPage = signal(0);
  searchC = signal("");
  refreshTrigger = signal(0);

  idCourseSelected = signal<number | null>(null);

  //Cria um observable reativo para buscar as courses sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private courseList$ = toObservable(
      computed(() => ({
        page: this.numberPage(),
        search: this.searchC(),
        refresh: this.refreshTrigger() //A lista vai ser recarregada sempre que `refreshTrigger` mudar
      }))
    ).pipe(
      //switchMap cancela requisições anteriores quando um novo valor chega
      switchMap(({ page, search }) => 
        this.#apiCourseService.httpListCourse(page, search).pipe(startWith(undefined))
      )
  );

  // Converte o Observable para Signal de forma correta
  getListCourses: Signal<Pageable<Courses> | undefined> = toSignal(this.courseList$);

  public searchCourse(search: string) {
    this.searchC.set(search);
  }
  
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
    //this.#apiServiceCategory.httpGetItems$(pageNumber, this.searchI()).subscribe();
  }

  deleteCourse(){
    if (this.idCourseSelected()) {
      this.#apiCourseService.httpDeleteCourse(this.idCourseSelected() as number)
        .subscribe(() => {
          this.refreshTrigger.update(v => v + 1);
        });
    }
  }
}
