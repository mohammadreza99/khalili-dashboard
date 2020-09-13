import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsPage } from './pages/products/products.page';
import { ProductModifyPage } from './pages/product-modify/product-modify.page';
import { CategoriesPage } from './pages/categories/categories.page';
import { CategoryModifyPage } from './pages/category-modify/category-modify.page';
import { CategorySliderPage } from './pages/category-slider/category-slider.page';
import { DiscountPage } from './pages/discount/discount.page';
import { ProductsViewPage } from './pages/products-view/products-view.page';
import { ProductsFavoritePage } from './pages/products-favorite/products-favorite.page';
import { CommentsPage } from './pages/comments/comments.page';

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
    children: [
      {
        path: 'list',
        component: CategoriesPage,
      },
      {
        path: 'modify',
        component: CategoryModifyPage,
      },
      {
        path: 'modify/:id',
        component: CategoryModifyPage,
      },
      {
        path: 'slider',
        data: { title: 'categories' },
        component: CategorySliderPage,
      },
    ],
  },
  {
    path: 'discount',
    data: { title: 'categories' },
    component: DiscountPage,
  },
  {
    path: 'views',
    data: { title: 'categories' },
    component: ProductsViewPage,
  },
  {
    path: 'favorites',
    data: { title: 'categories' },
    component: ProductsFavoritePage,
  },
  {
    path: 'comments',
    data: { title: 'categories' },
    component: CommentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
