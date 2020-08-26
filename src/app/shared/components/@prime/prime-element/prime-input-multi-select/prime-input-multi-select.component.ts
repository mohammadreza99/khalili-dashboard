import { Component, OnInit, forwardRef, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectItem } from 'primeng';


import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import { PrimeFilterMatchMode } from '../../prime-type/prime-filter-match-mode';

@Component({
  selector: 'prm-input-multi-select',
  templateUrl: './prime-input-multi-select.component.html',
  styleUrls: ['./prime-input-multi-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputMultiSelectComponent),
      multi: true
    }
  ]
})
export class PrimeInputMultiSelectComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {

  // constructor() { super() }

  @Input() items: SelectItem[]|any;
  @Input() hasFilter: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() optionLabel: string = null;
  @Input() filterBy: string = "label";
  @Input() scrollHeight: string = "200px";
  @Input() panelStyle: object = null;
  @Input() showToggleAll: boolean = true;
  @Input() filterPlaceHolder: string = "";
  @Input() filterMatchMode: PrimeFilterMatchMode = "contains";
  @Input() defaultLabel: string = "انتخاب";
  @Input() overlayVisible: boolean = false;
  @Input() displaySelectedLabel: boolean = true;
  @Input() selectedItemsLabel: string = "{0} مورد انتخاب شدند";
  @Input() resetFilterOnHide: boolean = true;
  @Input() emptyFilterMessage: string = "موردی یافت نشد.";
  @Input() selectionLimit: number = null;
  @Input() maxSelectedLabels: number = 3;
  @Output() onClick = new EventEmitter();
  @Output() onPanelShow = new EventEmitter();
  @Output() onPanelHide = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onClick() {
    if (this.hasValueAccessor) {
      if (!this.value || (this.value && this.value.length == 0))
        this.controlOnChange(null);
      else this.controlOnChange(this.value);
    }
    this.onClick.emit(this.value);
  }

  _onChange() {
    if (this.hasValueAccessor) {
      if (!this.value || (this.value && this.value.length == 0))
        this.controlOnChange(null);
      else this.controlOnChange(this.value);
    }
    this.onChange.emit(this.value);
  }

  _onPanelShow() {
    this.onPanelShow.emit();
  }

  _onPanelHide() {
    this.onPanelHide.emit();
  }

}
