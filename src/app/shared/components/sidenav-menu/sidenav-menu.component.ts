import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.scss'],
})
export class SidenavMenuComponent implements OnInit {
  constructor(private dataService: DataService) {}

  items: MenuItem[] = this.dataService.sideMenuItems;

  ngOnInit() {}
}
