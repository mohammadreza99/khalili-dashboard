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
    data: { title: 'محصولات' },
    component: ProductsPage,
  },
  {
    path: 'modify',
    data: { title: 'افزودن محصول' },
    component: ProductModifyPage,
  },
  {
    path: 'modify/:id',
    data: { title: 'ویرایش محصول' },
    component: ProductModifyPage,
  },
  {
    path: 'categories',
    children: [
      {
        path: 'list',
        data: { title: 'دسته بندی محصولات' },
        component: CategoriesPage,
      },
      {
        path: 'modify',
        data: { title: 'افزودن دسته بندی' },
        component: CategoryModifyPage,
      },
      {
        path: 'modify/:id',
        data: { title: 'ویرایش دسته بندی' },
        component: CategoryModifyPage,
      },
      {
        path: 'slider',
        data: { title: 'اسلایدر دسته بندی' },
        component: CategorySliderPage,
      },
    ],
  },
  {
    path: 'discount',
    data: { title: 'تخفیف ها' },
    component: DiscountPage,
  },
  {
    path: 'views',
    data: { title: 'بازدید محصولات' },
    component: ProductsViewPage,
  },
  {
    path: 'favorites',
    data: { title: 'علاقه مندی کابران' },
    component: ProductsFavoritePage,
  },
  {
    path: 'comments',
    data: { title: 'نظرات کاربران' },
    component: CommentsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
