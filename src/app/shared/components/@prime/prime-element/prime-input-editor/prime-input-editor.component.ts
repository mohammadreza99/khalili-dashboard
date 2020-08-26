import { Component, OnInit, forwardRef, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-input-editor',
  templateUrl: './prime-input-editor.component.html',
  styleUrls: ['./prime-input-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputEditorComponent),
      multi: true,
    },
  ],
})
export class PrimeInputEditorComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  _onTextChange() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onChange.emit(this.value);
  }
}
