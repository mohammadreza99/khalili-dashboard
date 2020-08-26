import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  AfterViewInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-autocomplete',
  templateUrl: './prime-input-autocomplete.component.html',
  styleUrls: ['./prime-input-autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputAutocompleteComponent),
      multi: true,
    },
  ],
})
export class PrimeInputAutocompleteComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  @Input() field: any;
  @Input() inputStyle: object;
  @Input() multiple: boolean = false;
  @Input() autoHighlight: boolean = false;
  @Input() forceSelection: boolean = false;
  @Input() unique: boolean = true;
  @Input() showDropdown: boolean = false;
  @Input() minLength: number = 1;
  @Input() emptyMessage: string = 'موردی یافت نشد.';
  @Input() items: any[];
  @Output() onSelect = new EventEmitter();
  @Output() onUnSelect = new EventEmitter();
  @Output() onKeyup = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();

  filteredItems: any[] = [];

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onSelect() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onSelect.emit(this.value);
  }

  _onClear() {
    this.value = null;
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onClear.emit();
  }

  _onKeyUp() {
    if (this.value != '') {
      if (this.hasValueAccessor) this.controlOnChange(this.value);
      this.onKeyup.emit(this.value);
    }
  }

  _onUnSelect() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onUnSelect.emit();
  }

  _onDropdownClick() {
    this.onDropdownClick.emit();
  }

  filterItem(event) {
    let query = event.query;
    let filtered: any[] = [];
    for (let i = 0; i < this.items.length; i++) {
      let item;
      if (this.field) item = this.items[i][this.field];
      else item = this.items[i];
      if (item.indexOf(query) == 0) filtered.push(item);
    }
    this.filteredItems = filtered;
  }
}
