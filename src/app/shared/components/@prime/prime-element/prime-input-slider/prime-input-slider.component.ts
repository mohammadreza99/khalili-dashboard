import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Optional,
  Host,
  SkipSelf,
  Input,
  Output,
  EventEmitter,
  Injector,
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  ControlContainer,
  FormGroupDirective,
  FormGroup,
  FormControl,
  NgControl,
} from '@angular/forms';
import { PrimeOrientation } from '../../prime-type/prime-orientation';
import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-slider',
  templateUrl: './prime-input-slider.component.html',
  styleUrls: ['./prime-input-slider.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputSliderComponent),
      multi: true,
    },
  ],
})
export class PrimeInputSliderComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  @Input() items: string[];
  @Input() orientation: PrimeOrientation = 'horizontal';
  @Input() range: boolean = false;
  @Input() step: number;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() width: number;
  @Input() height: number = 150;
  @Output() onSlideEnd = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
    var style = {
      width: this.orientation == 'horizontal' ? this.width + 'px' : '',
      height: this.orientation == 'vertical' ? this.height + 'px' : '',
    };
    // Object.assign(this.style, style);
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    if (this.hasValueAccessor && this.formControl.value == null)
      this.formControl.setValue([this.min, this.max]);
  }

  _onChange() {
    if (this.controlContainer) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }

  _onSlideEnd() {
    if (this.controlContainer) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }
}
