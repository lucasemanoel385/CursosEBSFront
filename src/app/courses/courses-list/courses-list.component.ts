import { Component, Signal, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaginatorComponent } from '../../default/paginator/paginator.component';
import { CoursesService } from '../../management/courses/service/courses.service';
import { Pageable } from '../../default/paginator/interface/pageable.interface';
import { Courses } from '../../management/courses/interface/courses.interface';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { startWith, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [RouterLink, PaginatorComponent, FormsModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {

  #route = inject(ActivatedRoute);
  #apiCourseService = inject(CoursesService);
  numberPage = signal(0);
  searchC = signal("");
  category = signal("");

  private courseList$ = toObservable(
    computed(() => ({
      search: this.searchC(),
      page: this.numberPage(),
      category: this.category()
    }))
  ).pipe(switchMap(({search, page, category}) => this.#apiCourseService.httpListCourse(page, search, undefined, category).pipe(startWith(undefined))));

  constructor() {
    this.searchC.set(this.#route.snapshot.params['search'] ?? null);
  }

  getListCourses: Signal<Pageable<Courses> | undefined> = toSignal(this.courseList$);

  selectedCategory: string | null = null;


  filterCategory(category: string) {
    if(this.selectedCategory === category) {
      this.selectedCategory = null;
      this.category.set("");
    } else {
      this.selectedCategory = category;
      this.category.set(category);
    }
  }

  public searchCourse(search: HTMLInputElement) {
    this.searchC.set(search.value);
  }
  
  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }
}
