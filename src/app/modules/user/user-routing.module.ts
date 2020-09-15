import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersPage } from './pages/users/users.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UsersPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
