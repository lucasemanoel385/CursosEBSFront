import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { ListDefaultComponent } from '../../../../management-default/list-default/list-default.component';
import { LessonService } from '../../service/lesson.service';
import { Lesson } from '../../interface/lesson.interface';
import { Observable, concatMap, startWith, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../../default/paginator/paginator.component';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';
import { DialogComponent } from '../../../../management-default/dialog/dialog.component';

@Component({
  selector: 'app-lesson-list',
  standalone: true,
  imports: [ListDefaultComponent, AsyncPipe, RouterLink, PaginatorComponent, DialogComponent],
  templateUrl: './lesson-list.component.html',
  styleUrl: './lesson-list.component.scss'
})
export class LessonListComponent {

  #apiLessonService = inject(LessonService);

  numberPage = signal(0);
  searchL = signal("");
  refreshTrigger = signal(0);
  idLessonSelected = signal<number | null>(null);

  //Cria um observable reativo para buscar as lessons sempre que `numberPage`, `searchL` ou `refreshTrigger` mudarem
  private lessonList$ = toObservable(
    computed(() => ({
      //A lista vai ser recarregada sempre que mudar o valor do signal
      page: this.numberPage(),
      search: this.searchL(),
      refresh: this.refreshTrigger()
    }))
  ).pipe(
    //switchMap cancela requisições anteriores quando um novo valor chega
    switchMap(({ page, search }) => 
      this.#apiLessonService.httpListLesson(page, search).pipe(startWith(undefined))
    )
  );

  // Converte o Observable para Signal
  getListLesson: Signal<Pageable<Lesson> | undefined> = toSignal(this.lessonList$);

  public searchLesson(search: string) {
    this.searchL.set(search);
  }

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }

  deleteLesson() {
    if (this.idLessonSelected()) {
      this.#apiLessonService.httpDeleteLesson(this.idLessonSelected() as number)
        .subscribe(() => {
          this.refreshTrigger.update(v => v + 1);
        });
    }
  }
}
