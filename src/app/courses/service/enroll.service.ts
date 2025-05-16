import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { Enrollment } from '../interface/enrollment.interface';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  #http = inject(HttpClient);
  #url = signal(environment.api);

  public httpSignUpCourse$(userId: number, courseId: number): Observable<Enrollment> {

    return this.#http.post<Enrollment>(`${this.#url()}enrollments-ms/enrollment/${userId}/${courseId}`, null).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpCheckIfStudentIsEnrolledTheCourse$(userId: number, courseId: number): Observable<boolean> {

    return this.#http.get<boolean>(`${this.#url()}enrollments-ms/enrollment/check-user-enroll/${userId}/${courseId}`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }

  public httpQuantityUserEnrolled$(): Observable<number> {

    return this.#http.get<number>(`${this.#url()}enrollments-ms/enrollment`).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }
}
