import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './main/home/home.page';
import { AuthGuard } from './modules/auth/business/auth.guard';
import { AuthPage } from './modules/auth/pages/auth/auth.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/base/colors',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthPage,
    data: { title: 'auth' },
  },
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'base',
        data: { title: 'مدیریت اطلاعات پایه' },
        loadChildren: () =>
          import('@app/modules/basic/basic.module').then((m) => m.BasicModule),
      },
      {
        path: 'product',
        data: { title: 'محصولات' },
        loadChildren: () =>
          import('@app/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'order',
        data: { title: 'سفارشات' },
        loadChildren: () =>
          import('@app/modules/order/order.module').then((m) => m.OrderModule),
      },
      {
        path: 'user',
        data: { title: 'کاربران' },
        loadChildren: () =>
          import('@app/modules/user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
