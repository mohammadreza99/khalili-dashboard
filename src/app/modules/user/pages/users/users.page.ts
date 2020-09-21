import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { SelectItem } from 'primeng';
import { Observable } from 'rxjs';
import { UserService } from '../../business/user.service';
import { SecurityRole, SiteUser } from '../../model/user.model';

@Component({
  selector: 'users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  originalRoles: SecurityRole[];
  convertedRoles: SelectItem[];
  rowData$: Observable<SiteUser[]>;
  columnDefs: ColDef[] = [
    {
      field: 'firstName',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'نام خانوادگی',
      editable: false,
    },
    {
      field: 'nationalCode',
      headerName: 'کدملی',
      editable: false,
    },
    {
      field: 'mobileNo',
      headerName: 'شماره تلفن',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'birthDate',
      headerName: 'تاریخ تولد',
      editable: false,
    },
    {
      field: 'jobTitle',
      headerName: 'شغل',
      editable: false,
    },
    {
      field: 'cardNumber',
      headerName: 'شماره کارت',
      editable: false,
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadRoles();
    this.rowData$ = this.userService.getUsers();
  }

  onRoleChange(roleId) {
    this.rowData$ = this.userService.getUsers(roleId);
  }

  async loadRoles() {
    this.originalRoles = await this.userService.getRoles().toPromise();
    this.convertedRoles = this.originalRoles.map((item) => {
      return { label: item.title, value: item.id };
    });
  }
}
