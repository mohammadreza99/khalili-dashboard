import { Component, OnInit, forwardRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-mask',
  templateUrl: './prime-input-mask.component.html',
  styleUrls: ['./prime-input-mask.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputMaskComponent),
      multi: true
    }
  ]
})
export class PrimeInputMaskComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() mask: string = "99-999";
  @Input() type: string = "text";
  @Input() characterPattern: string = "[A-Za-z]";
  @Input() size: number = null;
  @Input() autoClear: boolean = false;
  @Input() slotChar: string = "_";
  @Output() onComplete = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onComplete() {
    if (this.controlContainer)
      this.controlOnChange(this.value);
    this.onComplete.emit(this.value);
  }

  _onInput() {
    //this event NEVER fire! this is a BUG
    if (this.controlContainer)
      this.controlOnChange(this.value);
    this.onInput.emit(this.value);
  }
}
