import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ErrorService } from './services/error.service';
import { PrimeToastService } from './shared/components/@prime/prime-service/prime-toast.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private errorService: ErrorService,
    private toastService: PrimeToastService,
    private vcRef: ViewContainerRef,
    private router: Router,
    private title: Title,
    private route: ActivatedRoute
  ) {
    router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((e) => {
          return route;
        }),
        map((r) => {
          while (r.firstChild) {
            r = r.firstChild;
          }
          return r;
        }),
        filter((r) => r.outlet === 'primary'),
        mergeMap((r) => r.data),
        map((event) => {
          return event['title'];
        })
      )
      .subscribe((titleString) => {
        title.setTitle(titleString?.toString());
      });
  }

  ngOnInit() {
    this.errorService.getError().subscribe((error) => {
      if (error) {
        this.toastService.show(
          { summary: 'خطا', detail: error, severity: 'error' },
          this.vcRef
        );
      }
    });
  }
}
