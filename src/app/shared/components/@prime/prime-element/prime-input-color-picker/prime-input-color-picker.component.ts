import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-color-picker',
  templateUrl: './prime-input-color-picker.component.html',
  styleUrls: ['./prime-input-color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputColorPickerComponent),
      multi: true,
    },
  ],
})
export class PrimeInputColorPickerComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  @Input() format: 'hex' | 'rgb' | 'hsb' = 'hex';

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onChange() {
    if (this.hasValueAccessor)
      this.controlOnChange(this.value.replace(/#(?=\S)/g, ''));
    this.onChange.emit(this.value);
  }
}
