import { Component, OnInit, forwardRef, AfterViewInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-number',
  templateUrl: './prime-input-number.component.html',
  styleUrls: ['./prime-input-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputNumberComponent),
      multi: true
    }
  ]
})
export class PrimeInputNumberComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() min: number = 0;
  @Input() max: number;
  @Input() step: number = 1;
  @Input() size: number;
  @Input() thosandSeparator: string = null;
  @Input() decimalSeparator: string = null;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onChange() {
    if (this.controlContainer)
      this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }

}
