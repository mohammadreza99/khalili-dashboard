import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
} from '@angular/core';
import { MessageService } from 'primeng/api';

import { PrimeToastComponent } from '../prime-element/prime-toast/prime-toast.component';
import { PrimeToastOptions } from '../prime-model/prime-toast-options.model';
import { PrimeMessage } from '../prime-model/prime-message.model';

@Injectable({
  providedIn: 'root',
})
export class PrimeToastService {
  constructor(
    private messageService: MessageService,
    private resolver: ComponentFactoryResolver
  ) {}

  show(
    message: PrimeMessage,
    viewContainerRef: ViewContainerRef,
    options?: PrimeToastOptions
  ): Promise<any> {
    let cmp: ComponentRef<PrimeToastComponent>;
    if (viewContainerRef.length == 0) {
      let factory = this.resolver.resolveComponentFactory(PrimeToastComponent);
      cmp = viewContainerRef.createComponent(factory);
      Object.assign(cmp.instance.options, options);
    }

    let _message = new PrimeMessage();
    Object.assign(_message, message);

    setTimeout(() => {
      this.messageService.add(_message);
    }, 0);
    return new Promise<any>((resolve, reject) => {
      resolve();
    });
  }

  clear() {
    this.messageService.clear();
  }

  showMultiple(messages: PrimeMessage[]) {
    this.messageService.addAll(messages);
  }
}
