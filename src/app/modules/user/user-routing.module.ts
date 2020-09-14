import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolesPage } from './pages/roles/roles.page';
import { UsersPage } from './pages/users/users.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'roles',
    component: RolesPage,
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
