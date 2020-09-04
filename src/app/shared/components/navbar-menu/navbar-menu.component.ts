import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewContainerRef,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { PrimeConfirmService } from '../@prime/prime-service/prime-confirm.service';
import { AuthService } from '@app/modules/auth/business/auth.service';

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
      icon: 'pi pi-sign-out',
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
            this.authService.logout()
            this.router.navigate(['/auth']);
          });
      },
    },
  ];

  constructor(
    private router: Router,
    private vcRef: ViewContainerRef,
    private confirmService: PrimeConfirmService,
    private authService: AuthService,

  ) {}

  ngOnInit() {}

  changeTheme() {
    document.querySelector('body').classList.toggle('dark');
  }
}
