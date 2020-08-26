import { Component, OnInit, forwardRef, AfterViewInit, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-checkbox-single',
  templateUrl: './prime-input-checkbox-single.component.html',
  styleUrls: ['./prime-input-checkbox-single.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputCheckboxSingleComponent),
      multi: true,
    },
  ],
})
export class PrimeInputCheckboxSingleComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() checkboxIcon: string = "pi pi-check";

  ngOnInit() {
    super.ngOnInit();
    this.labelPosition = "top"
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onChange() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }

  isFieldValid(formControl: FormControl) {
    return (
      (formControl.invalid && formControl.touched) ||
      (formControl.invalid && formControl.dirty)
    );
  }


}
