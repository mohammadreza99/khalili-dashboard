import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { ProductModifyPage } from './pages/product-modify/product-modify.page';
import { CategoriesPage } from './pages/categories/categories.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: ProductsPage,
  },
  {
    path: 'modify',
    component: ProductModifyPage,
  },
  {
    path: 'modify/:id',
    component: ProductModifyPage,
  },
  {
    path: 'categories',
    data: { title: 'categories' },
    component: CategoriesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
