import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BookService} from './shared/services/book.service';
import {AuthService} from './shared/services/auth.service';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { PaginationComponent } from './shared/components/pagination/pagination.component';
import {AuthInterceptor} from './shared/auth.interceptor';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
};

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HomePageComponent,
    BookPageComponent,
    CatalogPageComponent,
    PaginationComponent,
    BasketPageComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    BookService,
    AuthService,
    INTERCEPTOR_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
