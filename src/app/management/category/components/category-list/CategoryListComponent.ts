import { Component, OnInit, Signal, computed, effect, inject, signal } from '@angular/core';
import { ListDefaultComponent } from '../../../../management-default/list-default/list-default.component';
import { CategoryService } from '../../service/service-category.service';
import { Observable, startWith, switchMap } from 'rxjs';
import { Category } from '../../interface/category.interface';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { PaginatorComponent } from '../../../../default/paginator/paginator.component';
import { Paginator } from '../../../../default/paginator/interface/paginator.interface';
import { Pageable } from '../../../../default/paginator/interface/pageable.interface';
import { RouterLink } from '@angular/router';
import { DialogComponent } from '../../../../management-default/dialog/dialog.component';


@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [ListDefaultComponent, AsyncPipe, PaginatorComponent, RouterLink, DialogComponent],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {

  #apiServiceCategory = inject(CategoryService);

  numberPage = signal(0);
  searchC = signal('');

  refreshTrigger = signal(0);

  idCategorySelected = signal<number | null>(null);

  private categoryList$ = toObservable(
      computed(() => ({
        page: this.numberPage(),
        search: this.searchC(),
        refresh: this.refreshTrigger()
      }))
    ).pipe(
      switchMap(({ page, search }) => 
        this.#apiServiceCategory.httpListCategory(page, search).pipe(startWith(undefined))
      )
  );

  // Converte o Observable para Signal de forma correta
  getListCategory: Signal<Pageable<Category> | undefined> = toSignal(this.categoryList$);


  searchClient(search: string) {
    this.searchC.set(search);
  }

  handlePageEvent(pageNumber: number) {
    this.numberPage.set(pageNumber);
  }

  deleteCategory(){
    if (this.idCategorySelected()) {
      this.#apiServiceCategory.httpDeleteCategory(this.idCategorySelected() as number)
        .subscribe(() => {
          this.refreshTrigger.update(v => v + 1);
        });
    }
  }

}
