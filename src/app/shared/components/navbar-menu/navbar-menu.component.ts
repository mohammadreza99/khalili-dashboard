import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { PrimeConfirmService } from '../@prime/prime-service/prime-confirm.service';

@Component({
  selector: 'navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  @Output() hambergurClick = new EventEmitter();

  accountItems: MenuItem[] = [
    {
      label: 'خروج',
      icon: 'fad fa-book',
      command: (event) => {
        this.confirmService
          .show(
            {
              header: 'خروج از سایت',
              message: 'آیا برای خروج اطمینان دارید؟',
              acceptLabel: 'بلی',
              rejectLabel: 'خیر',
            },
            this.vcRef
          )
          .then(() => {
            this.router.navigate(['/login']);
          });
      },
    },
  ];

  constructor(
    private router: Router,
    private vcRef: ViewContainerRef,
    private confirmService: PrimeConfirmService
  ) {}

  ngOnInit() {}

  changeTheme() {
    document.querySelector('body').classList.toggle('dark');
  }
}
