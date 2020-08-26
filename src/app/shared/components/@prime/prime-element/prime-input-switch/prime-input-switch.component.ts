import { Component, OnInit, forwardRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-switch',
  templateUrl: './prime-input-switch.component.html',
  styleUrls: ['./prime-input-switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputSwitchComponent),
      multi: true
    }
  ]
})
export class PrimeInputSwitchComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }
  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onChange() {
    if (
      !this.value &&
      this.controlContainer &&
      this.formControl.errors &&
      this.formControl.errors.required
    ) {
      this.formControl.setValue(null);
      this.value = null;
    }
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }
}
