import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Courses } from '../../courses/interface/courses.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Lesson } from '../interface/lesson.interface';
import { Pageable } from '../../../default/paginator/interface/pageable.interface';
import { ServicePopupService } from '../../../default/service/service-popup.service';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  #http = inject(HttpClient);
  #url = signal(environment.api);
  #popup = inject(ServicePopupService);


  public httpCreateLesson(lesson: Lesson, file: File): Observable<Lesson> {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('data', new Blob([JSON.stringify(lesson)], {type: 'application/json' }))

    return this.#http.post<Lesson>(`${this.#url()}courses-ms/lesson`, formData).pipe(
      tap(() => {
        this.#popup.show("Salvo com sucesso");
      }),
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }
  
  public httpListLesson(page?: number, search?: string): Observable<Pageable<Lesson>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<Lesson>>(`${this.#url()}courses-ms/lesson`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListLessonById(id: number): Observable<Lesson> {

    return this.#http.get<Lesson>(`${this.#url()}courses-ms/lesson/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListLessonByCourseId(id: number): Observable<Lesson[]> {

    return this.#http.get<Lesson[]>(`${this.#url()}courses-ms/lesson/get-by-course/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpUpdateLesson(lesson: Lesson): Observable<Lesson> {

    return this.#http.put<Lesson>(`${this.#url()}courses-ms/lesson/${lesson.id}`, lesson).pipe(
      tap(() => {
        this.#popup.show("Salvo com sucesso");
      }),
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }

  public httpDeleteLesson(id: number): Observable<Lesson> {

    return this.#http.delete<Lesson>(`${this.#url()}courses-ms/lesson/${id}`).pipe(
      tap(() => {
        this.#popup.show("Deletado com sucesso");
      }),
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error);
      return throwError(() => error);
    }))
  }
}
