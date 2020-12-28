import { Component, OnInit } from '@angular/core';
import {Book} from '../../shared/interfaces';
import {BookService} from '../../shared/services/book.service';
import {PaginatorService} from '../../shared/services/pagination.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent implements OnInit {

  books: Book[];
  itemsOnPage = 5;
  filteredBooks: Book[];
  filter = '';

  constructor(
    private bookService: BookService,
    public paginationService: PaginatorService,
  ) { }

  ngOnInit(): void {
    this.removeFilters();
  }

  applyFilters(): void {
    this.bookService.getAllWithQuery(this.filter).subscribe(books => {
      this.books = books;
      this.paginationService.initPagination(this.books, this.itemsOnPage);
    });
  }

  removeFilters(): void {
    this.bookService.getAll().subscribe(books => {
      this.books = books;
      this.paginationService.initPagination(this.books, this.itemsOnPage);
    });
  }
}
