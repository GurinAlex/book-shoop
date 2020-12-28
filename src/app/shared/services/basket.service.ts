import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Book} from '../interfaces';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BasketService {
  constructor(
    private http: HttpClient,
  ) { }

  private count: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  public count$ =  this.count.asObservable();

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.api_server}/basket/books`);
  }

  getCount(): Promise<number> {
    return this.http.get<number>(`${environment.api_server}/basket/count`)
      .pipe(tap(count => this.count.next(count)))
      .toPromise();
  }

  clearBasket(): Observable<any> {
    return this.http.delete(`${environment.api_server}/basket/clear`);
  }

  removeItem(bookId: string): Observable<any> {
    return this.http.delete(`${environment.api_server}/basket/bookDelete/${bookId}`);
  }

  addToBasket(bookId: string): Observable<any> {
    return this.http.post<any>(`${environment.api_server}/basket/bookAdd/${bookId}/`, {});
  }
}
