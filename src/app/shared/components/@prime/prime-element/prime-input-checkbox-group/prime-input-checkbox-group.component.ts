import { Component, OnInit, AfterViewInit, Input, forwardRef } from '@angular/core';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'prm-input-checkbox-group',
  templateUrl: './prime-input-checkbox-group.component.html',
  styleUrls: ['./prime-input-checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputCheckboxGroupComponent),
      multi: true
    }
  ]
})
export class PrimeInputCheckboxGroupComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() items: (string | any)[] = [];
  @Input() inline: boolean = true;
  @Input() field: string;
  @Input() checkboxIcon: string = "pi pi-check";

  name: string;

  ngOnInit() {
    super.ngOnInit();
    this.name = this.getGroupId();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }


  _onChange() {
    if (this.hasValueAccessor) {
      if (!this.value || (this.value && this.value.length == 0))
        this.controlOnChange(null);
      else
        this.controlOnChange(this.value);
    }
    this.onChange.emit(this.value);
  }

  getGroupId() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }

}
