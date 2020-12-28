import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {BookService} from '../../shared/services/book.service';
import {Book} from '../../shared/interfaces';
import {BasketService} from '../../shared/services/basket.service';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['❮', '❯'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  customOptionsLite: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['❮', '❯'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  };

  customOptionsMiddle: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['❮', '❯'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1.3
      }
    },
    nav: true
  };
  bestsellers: Book[];

  constructor(
    private bookService: BookService,
    private basketService: BasketService,
    private auth: AuthService,
  ) { }

  addToBasket(id: string): void {
    if (this.auth.isAuthenticated()) {
      this.basketService.addToBasket(id).subscribe(() => {
        this.basketService.getCount();
      });
    }
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(books => {
      console.log(books);
      this.bestsellers = books.filter(book => book.isBestseller);
    });
  }

}
