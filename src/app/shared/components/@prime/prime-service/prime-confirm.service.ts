import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import { ConfirmationService } from 'primeng';

import { PrimeConfirmOptions } from '../prime-model/prime-confirm-options.model';
import { PrimeConfirmComponent } from '../prime-element/prime-confirm/prime-confirm.component';

@Injectable({
  providedIn: 'root',
})
export class PrimeConfirmService {
  constructor(
    private confirmationService: ConfirmationService,
    private resolver: ComponentFactoryResolver
  ) {}

  show(
    options: PrimeConfirmOptions,
    viewContainerRef: ViewContainerRef
  ): Promise<any> {
    let factory = this.resolver.resolveComponentFactory(PrimeConfirmComponent);
    let cmp = viewContainerRef.createComponent(factory);
    Object.assign(cmp.instance.options, options);
    return new Promise((accept, reject) => {
      this.confirmationService.confirm({
        message: options.message,
        key: options.key,
        header: options.header,
        icon: options.icon,
        blockScroll: options.blockScroll,
        defaultFocus: options.defaultFocus,
        accept: () => {
          viewContainerRef.clear();
          accept('accept');
        },
        reject: () => {
          viewContainerRef.clear();
          reject('reject');
        },
      });
    });
  }

  cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.show(
      {
        header: 'لغو عملیات',
        icon: 'fa fa-exclamation-triangle',
      },
      vcRef
    );
  }

  deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.show(
      {
        message: 'آیا از حذف این مورد اطمینان دارید؟',
        header: 'هشدار',
        icon: 'fa fa-times',
      },
      vcRef
    );
  }
}
