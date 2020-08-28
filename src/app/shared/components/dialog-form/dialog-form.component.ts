import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';
enum ValidationTypes {
  required = 'required',
  minlength = 'minlLength',
  maxlength = 'maxLength',
  min = 'min',
  max = 'max',
  email = 'email',
  pattern = 'pattern',
}
@Component({
  selector: 'dialog-form',
  templateUrl: './dialog-form.component.html',
  styleUrls: ['./dialog-form.component.scss'],
})
export class DialogFormComponent implements OnInit {
  constructor(
    @Optional() public dialogConfig: DynamicDialogConfig,
    @Optional() private dialogRef: DynamicDialogRef
  ) {}

  form = new FormGroup({});

  ngOnInit() {
    for (const item of this.dialogConfig.data) {
      this.form.addControl(item.formControlName, new FormControl(undefined));
      if (item.errors) {
        let validators = [];
        for (const error of item.errors) {
          if (error.type == 'required') validators.push(Validators.required);
          if (error.type == 'minlength')
            validators.push(Validators.minLength(error.value));
          if (error.type == 'maxlength')
            validators.push(Validators.maxLength(error.value));
          if (error.type == 'min') validators.push(Validators.min(error.value));
          if (error.type == 'max') validators.push(Validators.max(error.value));
          if (error.type == 'email') validators.push(Validators.email);
          if (error.type == 'pattern')
            validators.push(Validators.pattern(error.value));
          validators.push(Validators.pattern(error.value));
          this.form.controls[item.formControlName].setValidators(validators);
        }
      }
      if (item.type == 'dropdown') {
        (item.dropdownItems as Array<any>).unshift({
          label: 'انتخاب کنید',
          value: null,
        });
      }
      if (item.value) this.form.get(item.formControlName).setValue(item.value);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
