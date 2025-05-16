
import { Component, OnDestroy, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { ListDefaultComponent } from '../../../../management-default/list-default/list-default.component';
import { Observable, Subscription, startWith, switchMap } from 'rxjs';
import { User } from '../../interface/user.interface';
import { StudentsService } from '../../service/students.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../../../default/paginator/paginator.component';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';
import { DialogComponent } from '../../../../management-default/dialog/dialog.component';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [ListDefaultComponent, AsyncPipe, RouterLink, PaginatorComponent, DialogComponent],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {

  #apiStudentsService = inject(StudentsService);

  numberPage = signal(0);
  searchU = signal('');

  refreshTrigger = signal(0);

  private courseList$ = toObservable(
      computed(() => ({
        page: this.numberPage(),
        search: this.searchU(),
        refresh: this.refreshTrigger() 
      }))
    ).pipe(
      switchMap(({ page, search }) => 
        this.#apiStudentsService.httpListUser(page, search).pipe(startWith(undefined))
      )
  );

  getListStudents: Signal<Pageable<User> | undefined> = toSignal(this.courseList$);

  searchUser(search: string) {
    this.searchU.set(search);
  }

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }

  idUserSelected = signal<number | null>(null);

  deleteUser(){
    if (this.idUserSelected()) {
      this.#apiStudentsService.httpDeleteUser(this.idUserSelected() as number)
        .subscribe(() => {
          this.refreshTrigger.update(v => v + 1);
        });
    }
  }
}
