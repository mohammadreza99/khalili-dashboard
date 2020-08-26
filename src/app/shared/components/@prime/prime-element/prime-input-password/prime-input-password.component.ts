import { Component, OnInit, Input, AfterViewInit, forwardRef } from '@angular/core';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'prm-input-password',
  templateUrl: './prime-input-password.component.html',
  styleUrls: ['./prime-input-password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputPasswordComponent),
      multi: true,
    },
  ],
})
export class PrimeInputPasswordComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() promptLabel: string = "لطفا رمز خود را وارد کنید";
  @Input() weakLabel: string = "ضعیف";
  @Input() mediumLabel: string = "متوسط";
  @Input() strongLabel: string = "قوی";
  @Input() feedback: boolean = true;
  @Input() showPassword: boolean = false;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onInput() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onInput.emit(this.value);
  }
}
