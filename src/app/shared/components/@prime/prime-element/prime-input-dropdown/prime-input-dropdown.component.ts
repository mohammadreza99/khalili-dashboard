import {
  Component,
  OnInit,
  forwardRef,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import {
  PrimeDropdownItem,
  PrimeDropdownGroup,
} from '../../prime-model/prime-dropdown.model';
import { PrimePosition } from '../../prime-type/prime-position';
import { PrimeFilterMatchMode } from '../../prime-type/prime-filter-match-mode';

@Component({
  selector: 'prm-input-dropdown',
  templateUrl: './prime-input-dropdown.component.html',
  styleUrls: ['./prime-input-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputDropdownComponent),
      multi: true,
    },
  ],
})
export class PrimeInputDropdownComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  // constructor() { super() }

  @Input() items: PrimeDropdownItem[] | PrimeDropdownGroup[] | any[] = [];
  @Input() showClear: boolean = true;
  @Input() field: string = null;
  @Input() panelStyle: object = null;
  @Input() scrollHeight: string = '200px';
  @Input() editable: boolean = false;
  @Input() group: boolean = false;
  @Input() dataKey: string = null;
  @Input() filter: boolean = false;
  @Input() filterMatchMode: PrimeFilterMatchMode = 'contains';
  @Input() filterBy: string = 'label';
  @Input() filterPlaceholder: string = 'جستجو';
  @Input() placeholder: string = 'انتخاب';
  @Input() resetFilterOnHide: boolean = false;
  @Input() emptyFilterMessage: string = 'موردی یافت نشد';
  @Input() autoDisplayFirst: boolean = true;
  @Input() tooltip: any = null;
  @Input() tooltipPos: PrimePosition = 'top';
  @Output() onShow = new EventEmitter();
  @Output() onHide = new EventEmitter();
  _items: PrimeDropdownItem[] | PrimeDropdownGroup[] | any[] = [];
  selectId: string;
  ngOnInit() {
    super.ngOnInit();
    this.selectId = this.getId();
    if (typeof this.items[0] == 'string')
      for (const item of this.items)
        this._items.push(this.createFilterOptions(item));
    else this._items = this.items;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onShow() {
    this.onShow.emit();
  }

  _onHide() {
    this.onHide.emit();
  }

  _onChange(event) {
    if (this.hasValueAccessor) this.controlOnChange(event.value);
    this.onChange.emit(event.value);
  }

  createFilterOptions(item) {
    let options = [];
    let option;
    option = {
      label: item,
      value: item,
    };
    if (option.label == true || option.label == 'true') option.label = 'بله';
    if (option.label == false || option.label == 'false') option.label = 'خیر';

    let isDuplicate: boolean = false;
    for (const o of options) if (o.label == option.label) isDuplicate = true;
    if (!isDuplicate) options.push(option);
    return options;
  }
}
