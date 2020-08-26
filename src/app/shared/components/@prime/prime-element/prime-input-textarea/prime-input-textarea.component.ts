import { Component, OnInit, forwardRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-textarea',
  templateUrl: './prime-input-textarea.component.html',
  styleUrls: ['./prime-input-textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputTextareaComponent),
      multi: true
    }
  ]
})
export class PrimeInputTextareaComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  // constructor() { super() }

  @Input() rows: number;
  @Input() cols: number;
  @Input() autoResize: boolean;
  @Output() onResize = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onInput() {
    if (this.controlContainer)
      this.controlOnChange(this.value);
    this.onInput.emit(this.value);
  }

}
