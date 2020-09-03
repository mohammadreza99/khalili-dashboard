import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './main/login/login.page';
import { HomePage } from './main/home/home.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/base/colors',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPage,
    data: { title: 'login' },
  },
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'base',
        loadChildren: () =>
          import('@app/modules/basic/basic.module').then((m) => m.BasicModule),
      },
      {
        path: 'product',
        data: { title: 'products' },
        loadChildren: () =>
          import('@app/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
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
