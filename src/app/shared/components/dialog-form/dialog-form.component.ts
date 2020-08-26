import { Component, OnInit, Optional } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng';

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
          switch (error.type) {
            case 'required':
              validators.push(Validators.required);
              break;
            case 'minlength':
              validators.push(Validators.minLength);
              break;
            case 'maxlength':
              validators.push(Validators.maxLength);
              break;
            case 'min':
              validators.push(Validators.min);
              break;
            case 'max':
              validators.push(Validators.max);
              break;
            case 'email':
              validators.push(Validators.email);
              break;
            case 'pattern':
              validators.push(Validators.pattern);
              break;
          }
          this.form.controls[item.formControlName].setValidators(validators);
        }
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
