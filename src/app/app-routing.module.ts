import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './main/login/login.page';
import { HomePage } from './main/home/home.page';
import { DashboardPage } from './main/dashboard/dashboard.page';



const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
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
        path: 'dashboard',
        data: { title: 'dashboard' },
        component: DashboardPage,
      },
      {
        path: 'product',
        data: { title: 'products' },
        loadChildren: () =>
          import('@app/modules/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'base',
        loadChildren: () =>
          import('@app/modules/basic/basic.module').then((m) => m.BasicModule),
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
