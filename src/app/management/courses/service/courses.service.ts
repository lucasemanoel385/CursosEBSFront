import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Courses } from '../interface/courses.interface';
import { Pageable } from '../../../default/paginator/interface/pageable.interface';
import { ServicePopupService } from '../../../default/service/service-popup.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  #http = inject(HttpClient);
  #url = signal(environment.api);
  #popup = inject(ServicePopupService);

  #setListCourses = signal<Courses[] | null>(null);
  get getListCourses() {
    return this.#setListCourses.asReadonly();
  }

  public httpCreateCourse(course: Courses): Observable<Courses> {

    return this.#http.post<Courses>(`${this.#url()}courses-ms/courses`, course).pipe(
      tap(() => {
        this.#popup.show("Salvo com sucesso");
      }),
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }
  
  public httpListCourse(page?: number, search?: string, size?: number, category?: string, ): Observable<Pageable<Courses>> {

    var params;
    
    if (search && category) {
      params = new HttpParams().set('search', search).set('category', category).set('size', size as number);
   
     } else if (page && search) {
      params = new HttpParams().set('search', search).set('page', page).set('size', size as number);
  
     } else if (search) {
      params = new HttpParams().set('search', search).set('size', size as number);

    } else if (category) {
      params = new HttpParams().set('category', category).set('size', size as number);
      
     } else {
        params = new HttpParams().set('page', page as number).set('size', size as number);
     }

    return this.#http.get<Pageable<Courses>>(`${this.#url()}courses-ms/courses`, {params}).pipe(
  
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListCourseById(id: number): Observable<Courses> {

    return this.#http.get<Courses>(`${this.#url()}courses-ms/courses/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListCourseByParam(search: string): Observable<Pageable<Courses>> {

    return this.#http.get<Pageable<Courses>>(`${this.#url()}courses-ms/courses/filter`, {params:{search}}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpUpdateCourse(course: Courses): Observable<Courses> {
  
    return this.#http.put<Courses>(`${this.#url()}courses-ms/courses/${course.id}`, course).pipe(
      tap(() => {
        this.#popup.show("Salvo com sucesso");
      }),
      catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }

  public httpDeleteCourse(id: number): Observable<Courses> {

    return this.#http.delete<Courses>(`${this.#url()}courses-ms/courses/${id}`).pipe(
      tap(() => {
        this.#popup.show("Deletado com sucesso");
      }),
      catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }
  
}
