import { Pageable } from './../../../default/paginator/interface/pageable.interface';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interface/user.interface';
import { Profile } from '../interface/profile.interface';
import { Instructor } from '../interface/instructor.interface';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpCreateUser(course: User): Observable<User> {

    return this.#http.post<User>(`${this.#url()}users-ms/user/register`, course).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
  
  public httpListUser(page?: number, search?:string): Observable<Pageable<User>> {

    var params;
    
    if (page && search) {
      params = new HttpParams().set('search', search).set('page', page);
   
     } else if (search) {
      params = new HttpParams().set('search', search);
  
     } else {
        params = new HttpParams().set('page', page as number);
     }

    return this.#http.get<Pageable<User>>(`${this.#url()}users-ms/user`, {params}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListUserById(id: number): Observable<User> {

    return this.#http.get<User>(`${this.#url()}users-ms/user/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpUpdateUser(course: User): Observable<User> {

    return this.#http.put<User>(`${this.#url()}users-ms/user/${course.id}`, course).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpDeleteUser(id: number): Observable<User> {

    return this.#http.delete<User>(`${this.#url()}users-ms/user/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
  
  public httpListProfile(): Observable<Pageable<Profile>> {

    return this.#http.get<Pageable<User>>(`${this.#url()}users-ms/profile`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpListInstructor(instructor: string): Observable<Pageable<Instructor>> {

    return this.#http.get<Pageable<Instructor>>(`${this.#url()}users-ms/user/instructor`, {params: {instructor}}).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpInstructorById(id: number): Observable<Instructor> {

    return this.#http.get<Instructor>(`${this.#url()}users-ms/user/instructor/${id}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
