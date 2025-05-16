import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, catchError, shareReplay, tap, throwError } from 'rxjs';
import { CreateUser } from '../interface/createUser.interface';
import { AuthenticationUser } from '../interface/authenticationUser.interface';
import { LoginUser } from '../interface/loginUser.interface';
import { TokenJWTLogin } from '../interface/tokenJWTLogin.interface';
import { ChangePassword } from '../interface/changePassword.interface';
import { ServicePopupService } from '../../default/service/service-popup.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceLoginLogout {

  #http = inject(HttpClient);
  #url = signal(environment.api);
  #popup = inject(ServicePopupService);

  #setGetUser = signal<CreateUser | null>(null);
  get getUser() {
    return this.#setGetUser;
  }

  public httpCreateUser(user: CreateUser): Observable<CreateUser> {

    return this.#http.post<CreateUser>(`${this.#url()}users-ms/user/register`, user).pipe(
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error)
      return throwError(() => error);
    }))
  }

  public httpLoginUser(user: LoginUser): Observable<TokenJWTLogin> {

    return this.#http.post<TokenJWTLogin>(`${this.#url()}users-ms/auth/login`, user).pipe(
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message || error.error)
      return throwError(() => error);
    }))
  }

  public httpResetPassword(username: string): Observable<TokenJWTLogin> {

    return this.#http.get<TokenJWTLogin>(`${this.#url()}users-ms/user/resetPassword`, {params: {username}}).pipe(
    catchError( (error: HttpErrorResponse) => {
      this.#popup.show(error.error.message)
      return throwError(() => error);
    }))
  }

  public httpChangePassword(change: ChangePassword): Observable<String> {

    return this.#http.post<String>(`${this.#url()}users-ms/user/changePassword`, change).pipe(
    catchError( (error: HttpErrorResponse) => {
      return throwError(() => error);
    }))
  }


}
