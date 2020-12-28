import { Component, OnInit } from '@angular/core';
import {BasketService} from '../../shared/services/basket.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss']
})
export class BasketPageComponent implements OnInit {

  form = new FormGroup({
  });
  showModal = false;

  constructor(
    private basketService: BasketService,
  ) { }

  ngOnInit(): void {
    this.basketService.getAll().subscribe(data => console.log(data));
  }

}
