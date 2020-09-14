import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { UserService } from '../../business/user.service';
import { SecurityRole } from '../../model/user.model';

@Component({
  selector: 'roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  rowData$: Observable<SecurityRole[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.rowData$ = this.userService.getRoles();
  }
}
