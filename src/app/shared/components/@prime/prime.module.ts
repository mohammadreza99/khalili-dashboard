import { NgModule, ModuleWithProviders } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng';

import { PrimeElementModule } from './prime-element/prime-element.module';
import { PrimeMessageService } from './prime-service/prime-message.service';
import { PrimeToastService } from './prime-service/prime-toast.service';
import { PrimeConfirmService } from './prime-service/prime-confirm.service';

@NgModule({
  imports: [PrimeElementModule],
  exports: [PrimeElementModule],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    PrimeMessageService,
    PrimeToastService,
    PrimeConfirmService,
  ],
})
export class PrimeModule {
  static forRoot(): ModuleWithProviders<PrimeModule> {
    return {
      ngModule: PrimeModule,
      providers: [
        MessageService,
        DialogService,
        ConfirmationService,
        PrimeMessageService,
        PrimeToastService,
        PrimeConfirmService,
      ],
    };
  }
}
