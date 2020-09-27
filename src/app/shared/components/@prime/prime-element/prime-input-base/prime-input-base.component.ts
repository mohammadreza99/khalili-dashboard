import {
  Component,
  OnInit,
  AfterViewInit,
  Optional,
  Host,
  SkipSelf,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  Injector,
} from '@angular/core';
import {
  ControlValueAccessor,
  ControlContainer,
  FormGroupDirective,
  FormControlName,
  FormGroup,
  FormControl,
  NgControl,
} from '@angular/forms';

import { PrimeError } from '../../prime-model/prime-error.model';
import { PrimeLabelPosition } from '../../prime-type/prime-label-position';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-input-base',
  templateUrl: './prime-input-base.component.html',
  styleUrls: ['./prime-input-base.component.scss'],
})
export class PrimeInputBaseComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private _controlContainer?: ControlContainer,
    private cdr?: ChangeDetectorRef,
    private injector?: Injector
  ) {
    this.controlContainer = this._controlContainer as FormGroupDirective;
  }
  @Input() placeholder: string = '';
  @Input() label: string;
  @Input() labelWidth: number;
  @Input() errors: PrimeError[];
  @Input() disabled: boolean;
  @Input() readonly: boolean;
  @Input() name: string;
  @Input() value: any;
  @Input() maxlength: number;
  @Input() labelPosition: PrimeLabelPosition = 'side';
  @Input() hint: string = null;
  @Input() style: object = null;
  @Input() beforeAfterConfig: object = null;
  @Input() layout: PrimeDirection = 'rtl';
  @Output() onInput = new EventEmitter<any>();
  @Output() onChange = new EventEmitter<any>();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();

  controlOnChange: (value?: any) => void;
  controlOnTouched: () => void;
  id: string;
  fixMargin: number;
  controlContainer: FormGroupDirective;
  formControl: FormControl;
  hasValueAccessor: boolean = false;
  containerConfig = {};
  isRequired: boolean;
  ngOnInit() {
    this.id = this.getId();
  }

  ngAfterViewInit(): void {
    const ngControl = this.injector?.get(NgControl, null);
    if (ngControl) this.formControl = ngControl.control as FormControl;
    if (this.controlContainer && this.formControl) {
      if (this.controlIsRequired(this.formControl)) {
        if (this.label) this.label += ' *';
        if (this.placeholder != '' && this.placeholder != undefined)
          this.placeholder += ' *';
        this.cdr.detectChanges();
      }
      this.controlContainer.ngSubmit.subscribe(() => {
        if (this.value == false) {
          this.formControl.setValue(null);
          this.value = null;
        }
        this.validateAllFormFields(this.controlContainer.form);
      });
    }

    this.containerConfig = {
      labelPosition: this.labelPosition,
      label: this.label,
      id: this.id,
      labelWidth: this.labelWidth,
      errors: this.errors,
      disabled: this.disabled,
      readonly: this.readonly,
      hint: this.hint,
      name: this.name,
      controlContainer: this.controlContainer,
      formControl: this.formControl,
      layout: this.layout,
    };
  }

  controlIsRequired(control: FormControl): boolean {
    let isRequired = false;
    let formControl = new FormControl();
    for (const key in control) formControl[key] = control[key];
    formControl.setValue(null);
    if (formControl.errors && formControl.errors.required) isRequired = true;
    formControl.setValue(control.value);
    return isRequired;
  }

  writeValue(value: any): void {
    this.value = value ? value : null;
    this.hasValueAccessor = true;
  }

  registerOnChange(fn: any): void {
    this.controlOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.controlOnTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  getId() {
    return Math.random().toString(36).substr(2, 9);
  }

  validateAllFormFields(form: FormGroup) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (control instanceof FormControl && !this.disabled) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  _onFocus() {
    this.onFocus.emit();
  }

  _onBlur() {
    if (this.hasValueAccessor) this.controlOnTouched();
    this.onBlur.emit();
  }
}
