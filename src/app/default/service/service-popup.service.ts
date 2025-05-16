import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ServicePopupService {

  //Armazena o último valor e entrega imediatamente a novos inscritos.
  private messageSubject = new BehaviorSubject<string | null>(null);

  message$ = this.messageSubject.asObservable();

  show(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => this.clear(), 4000); // Remove após 3s
  }

  clear() {
    this.messageSubject.next(null);
  }
  
}
