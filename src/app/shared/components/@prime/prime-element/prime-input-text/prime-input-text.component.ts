import { Component, OnInit, forwardRef, AfterViewInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-text',
  templateUrl: './prime-input-text.component.html',
  styleUrls: ['./prime-input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputTextComponent),
      multi: true,
    },
  ],
})
export class PrimeInputTextComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

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
