import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng';

import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { DialogFormComponent } from '@shared/components/dialog-form/dialog-form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogFormService {
  constructor(private dialogService: DialogService) {}
  show(
    header: string,
    config: DialogFormConfig[],
    width = '400px',
    overflowY: 'scroll' | 'visible' = 'visible'
  ): DynamicDialogRef {
    return this.dialogService.open(DialogFormComponent, {
      header: header,
      data: config,
      width: width,
      contentStyle: { 'overflow-y': overflowY },
    });
  }
}
