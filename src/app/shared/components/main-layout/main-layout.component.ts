import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {noUndefined} from '@angular/compiler/src/util';
import {AuthService} from '../../services/auth.service';
import {User} from '../../interfaces';
import {BasketService} from '../../services/basket.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  showModal = false;
  register = false;
  form = this.fb.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeatPassword: new FormControl(null, Validators.required)
  });
  basketCount = 0;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private basketService: BasketService,
  ) { }

  ngOnInit(): void {
    this.basketService.getCount();
    this.basketService.count$.subscribe(c => this.basketCount = c);
  }

  logout(): void {
    this.authService.logout();
  }

  login(): void {
    if (!this.form.get('password').valid && !this.form.get('email').valid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.login(user).subscribe(() => {
      this.form.reset();
      this.showModal = false;
    });
  }

  signup(): void {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.signup(user).subscribe(() => {
      this.form.reset();
      this.showModal = false;
    });
  }

}
