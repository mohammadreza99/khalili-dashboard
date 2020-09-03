import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Chips } from 'primeng';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-tags',
  templateUrl: './prime-input-tags.component.html',
  styleUrls: ['./prime-input-tags.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputTagsComponent),
      multi: true,
    },
  ],
})
export class PrimeInputTagsComponent
  extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit,OnChanges {
 
  // constructor() { super() }

  @Input() max: number;
  @Input() field: string = undefined;
  @Input() inputStyle: object;
  @Input() allowDuplicate: boolean = false;
  @Input() addOnBlur: boolean = false;
  @Input() addOnTab: boolean = false;
  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onTagClick = new EventEmitter();
  @ViewChild('floatChips', { static: false }) floatChips: Chips;

  innerInput: any;

  ngOnInit() {
    super.ngOnInit();
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.floatChips)
      this.innerInput = this.floatChips.inputViewChild.nativeElement;

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.field && this.value)
      setTimeout(() => {
        let value=[];
        for (const item of this.value) value.push(item[this.field]);
        this.value=value;
      }, 0);
  }
  _onAdd(args) {
    let item={
      value:this.value,
      addedTag:args.value
    }
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onAdd.emit(item);
  }

  _onRemove(args) {
    let item={
      value:this.value,
      deletedTag:args.value
    }
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onRemove.emit(item);
  }

  _onTagClick() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onTagClick.emit(this.value);
  }

  __onBlur() {
    if (this.innerInput && this.innerInput.value == '') this._onBlur();
    else {
      if (this.hasValueAccessor) this.controlOnTouched();
      this.onBlur.emit();
    }
  }
}
