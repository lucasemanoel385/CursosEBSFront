import { Injectable, inject, signal } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface PreferenceId {
    preferenceId: string,
    url: string
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {

    #preference = signal('');

    get getPreference() {
        return this.#preference.asReadonly();
    }

    #http = inject(HttpClient);
    #url = signal(environment.api);

    public createPreference(id: string): Observable<PreferenceId> {
        return this.#http.get<PreferenceId>(this.#url() + 'payments-ms/api/payment/create-preference', {params:{id: id}});
      }

}