import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainLayoutComponent} from './shared/components/main-layout/main-layout.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {BookPageComponent} from './pages/book-page/book-page.component';
import {CatalogPageComponent} from './pages/catalog-page/catalog-page.component';
import {BasketPageComponent} from './pages/basket-page/basket-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      { path: '', redirectTo: '/', pathMatch: 'full' },
      { path: '', component: HomePageComponent },
      { path: 'book/:id', component: BookPageComponent },
      { path: 'catalog', component: CatalogPageComponent },
      { path: 'basket', component: BasketPageComponent },
      { path: 'test', component: TestPageComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
