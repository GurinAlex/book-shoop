import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {BookService} from '../../shared/services/book.service';
import {Book} from '../../shared/interfaces';
import {BasketService} from '../../shared/services/basket.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {

  book: Book;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private basketService: BasketService,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.bookService.getById(params['id']);
      })
    ).subscribe(book => {
      this.book = book;
    });
  }

  addToBasket(): void {
    this.basketService.addToBasket(this.book.id).subscribe(() => {
      this.basketService.getCount();
    });
  }
}
