import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Category } from '../interface/category.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Pageable } from '../../../default/paginator/interface/pageable.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateCategory(category: Category): Observable<Pageable<Category>> {

    return this.#http.post<Pageable<Category>>(`${this.#url()}courses-ms/category`, category).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
  
  public httpListCategory(page?: number, search?: string): Observable<Pageable<Category>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Category>>(`${this.#url()}courses-ms/category`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListCategoryById(id: number): Observable<Category> {

    return this.#http.get<Category>(`${this.#url()}courses-ms/category/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListCategoryWithFilter(search: string): Observable<Pageable<Category>> {

    return this.#http.get<Pageable<Category>>(`${this.#url()}courses-ms/category/filter`, {params:{search}}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpUpdateCategory(category: Category): Observable<Category> {

    return this.#http.put<Category>(`${this.#url()}courses-ms/category/${category.id}`, category).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteCategory(id: number): Observable<Category> {

    return this.#http.delete<Category>(`${this.#url()}courses-ms/category/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
  
}
