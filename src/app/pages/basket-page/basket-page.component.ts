import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../shared/services/basket.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Book, Order} from '../../shared/interfaces';
import {OrderService} from '../../shared/services/order.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {

  form = new FormGroup({
    city: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    fio: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required)
  });
  showModal = false;
  books: Book[];
  count: number;

  constructor(
    private basketService: BasketService,
    private orderService: OrderService,
  ) { }

  ngOnInit(): void {
    this.basketService.getAll().subscribe(books => {
      this.books = books;
    });
    this.basketService.count$.subscribe(_ => this.count = _);
  }

  removeById(bookId: string): void {
    this.basketService.removeItem(bookId).subscribe(() => {
      this.basketService.getCount();
      this.books = this.books.filter(_ => _.id !== bookId);
    });
  }

  removeAll(): void {
    this.basketService.clearBasket().subscribe(() => {
      this.basketService.getCount();
      this.books = [];
    });
  }

  totalSum(): number {
    let sum = 0;
    if (this.books) {
      this.books.forEach(book => sum += book.price);
    }

    return sum;
  }

  sendOrder(): void {
    const booksIds = [];
    this.books.forEach(_ => booksIds.push(_.id));

    const order = {
      email: this.form.value.email,
      city: this.form.value.city,
      fio: this.form.value.fio,
      phone: this.form.value.phone,
      address: this.form.value.address,
      bookIds: booksIds.toString(),
    };

    this.orderService.sendOrder(order).subscribe(() => {
      this.form.reset();
      this.showModal = false;
      this.removeAll();
      this.basketService.getCount();
    });
  }
}
