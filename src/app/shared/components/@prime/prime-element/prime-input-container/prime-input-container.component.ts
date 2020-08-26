import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import { FormGroupDirective, FormGroup, FormControl } from '@angular/forms';

import { PrimeLabelPosition } from '../../prime-type/prime-label-position';
import { PrimeError } from '../../prime-model/prime-error.model';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-input-container',
  templateUrl: './prime-input-container.component.html',
  styleUrls: ['./prime-input-container.component.scss'],
})
export class PrimeInputContainerComponent implements OnChanges, AfterViewInit {




  @Input() config: any;
  @Input() labelAlign: string = "center";
  @Input() showLabel: boolean = true;
  @Input() submitted: boolean = false;
  @ViewChild("fixLabel", { static: false }) fixLabel: ElementRef;

  labelPosition: PrimeLabelPosition = "side";
  label: string;
  id: string;
  errorStyle = {};
  labelWidth: number;
  errors: PrimeError[] = [];
  disabled: boolean;
  hint: string;
  name: string;
  fixMargin: number = 0;
  controlContainer: FormGroupDirective;
  formControl: FormControl;
  layout: PrimeDirection;

  constructor() { }
  ngAfterViewInit(): void {

  }

  ngOnChanges() {
    if (this.config) {
      this.labelPosition = this.config.labelPosition;
      this.label = this.config.label;
      this.id = this.config.id;
      this.labelWidth = this.config.labelWidth;
      this.errors = this.config.errors;
      this.disabled = this.config.disabled;
      this.hint = this.config.hint;
      this.name = this.config.name;
      this.controlContainer = this.config.controlContainer;
      this.formControl = this.config.formControl;
      this.layout = this.config.layout;
      if (this.label && this.labelPosition == "side") {
        if (this.labelWidth) this.fixMargin = +(this.labelWidth) + 16;
        else this.fixMargin = this.fixLabel.nativeElement.offsetWidth + 16;
        this.errorStyle = (this.layout == 'rtl' ? { 'margin-right': this.fixMargin + "px" } : { 'margin-left': this.fixMargin + "px" });
      }
    }
  }

  isFieldValid(formControl: FormControl) {
    return (
      (formControl.invalid && formControl.touched) ||
      (formControl.invalid && formControl.dirty)
    );
  }

  hasError(error: PrimeError): boolean {
    return (
      this.controlContainer != null &&
      this.isFieldValid(this.formControl) &&
      this.formControl.hasError(error.type)
    );
  }
}
