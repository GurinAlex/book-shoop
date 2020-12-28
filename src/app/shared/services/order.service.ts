import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class OrderService {
  constructor(private http: HttpClient) {
  }

  sendOrder(order): Observable<any> {
    return this.http.post<any>(`${environment.api_server}/order`, order);
  }
}
