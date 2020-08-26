import {
  Injectable,
  ComponentFactoryResolver,
  ComponentRef,
  ViewContainerRef,
} from '@angular/core';

import { PrimeMessageComponent } from '../prime-element/prime-message/prime-message.component';
import { PrimeMessage } from '../prime-model/prime-message.model';
import { PrimeMessageOptions } from '../prime-model/prime-message-options.model';

@Injectable({
  providedIn: 'root',
})
export class PrimeMessageService {
  constructor(private resolver: ComponentFactoryResolver) {}
  private cmp: ComponentRef<PrimeMessageComponent>;

  show(
    message: PrimeMessage[] | PrimeMessage,
    viewContainerRef: ViewContainerRef,
    options?: PrimeMessageOptions
  ) {
    viewContainerRef.clear();
    let factory = this.resolver.resolveComponentFactory(PrimeMessageComponent);
    this.cmp = viewContainerRef.createComponent(factory);
    document
      .querySelector(viewContainerRef['_lContainer'][0][0].localName)
      .prepend(viewContainerRef.element.nativeElement.nextSibling);
    Object.assign(this.cmp.instance.options, options);
    this.cmp.instance.show(message);
  }

  clear() {
    this.cmp.instance.messages = [];
  }

  successfullMessage(vcRef: ViewContainerRef): void {
    return this.show(
      {
        summary: 'عملیات با موفقیت انجام شد.',
        detail: 'success',
        severity: 'success',
      },
      vcRef
    );
  }
}
