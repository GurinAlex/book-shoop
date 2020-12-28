import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from '../interfaces';
import {environment} from '../../../environments/environment';

@Injectable()
export class BookService {
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Book []> {
    return this.http.get<Book []>(`${environment.api_server}/books`);
  }

  getById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${environment.api_server}/book/${bookId}`);
  }
}
