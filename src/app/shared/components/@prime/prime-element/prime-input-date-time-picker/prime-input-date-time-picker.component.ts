import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { IDatePickerConfig } from 'ng2-jalali-date-picker';
import { Moment } from 'jalali-moment';
import * as moment from 'jalali-moment';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import { PrimeDatePickerMode } from '../../prime-type/prime-date-picker';

@Component({
  selector: 'prm-input-date-time-picker',
  templateUrl: './prime-input-date-time-picker.component.html',
  styleUrls: ['./prime-input-date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputDateTimePickerComponent),
      multi: true,
    },
  ],
})
export class PrimeInputDateTimePickerComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  // constructor() { super() }

  @Input() datePickerMode: PrimeDatePickerMode = 'day';
  @Input() minDate: Moment | string;
  @Input() maxDate: Moment | string;
  @Input() minTime: Moment | string;
  @Input() maxTime: Moment | string;
  @Input() config: IDatePickerConfig;
  @Input() clearable: boolean = false;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  __onBlur() {
    setTimeout(() => {
      super._onBlur();
    }, 150);
  }

  _onChange(args) {
    this.value = args.dateObj;
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }
}
