import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthPage } from './pages/auth/auth.page';

const routes: Routes = [
  {
    path: '',
    data: { title: 'ورود' },
    component: AuthPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
