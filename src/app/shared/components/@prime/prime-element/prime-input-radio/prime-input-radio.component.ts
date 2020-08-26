import { Component, OnInit, AfterViewInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-radio',
  templateUrl: './prime-input-radio.component.html',
  styleUrls: ['./prime-input-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputRadioComponent),
      multi: true
    }
  ]
})
export class PrimeInputRadioComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() items: (string | any)[] = [];
  @Input() inline: boolean = false;
  @Input() field: string;

  name: string;

  ngOnInit() {
    super.ngOnInit();
    this.name = this.getId();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onChange() {
    if (this.controlContainer) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }
}
