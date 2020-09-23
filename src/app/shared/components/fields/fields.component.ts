import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributeByCategoryId } from '@app/modules/product/model/product.model';

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit {
  @Input() attributes: AttributeByCategoryId[];

  form = new FormGroup({});

  constructor() {}

  attributeTypes = {
    1: 'Text',
    2: 'Number',
    3: 'Date',
    4: 'Text Area',
    5: 'Select',
    6: 'Multi Select',
    7: 'CheckBox',
  };

  ngOnInit() {
    // for (const item of this.attributes) {
    //   this.form.addControl(item.id.toString(), new FormControl(undefined));
    //   if (item.isRequired) {
    //     this.form.controls[item.id.toString()].setValidators(
    //       Validators.required
    //     );
    //   }
    //   if (this.attributeTypes[item.attributeTypeId] == 'Select') {
    //     (item.dropdownItems as Array<any>).unshift({
    //       label: 'انتخاب کنید',
    //       value: null,
    //     });
    //   }
    //   if (item.value) this.form.get(item.formControlName).setValue(item.value);
    // }
  }

  onSubmit() {
    // if (this.form.valid) {
    //   this.dialogRef.close(this.form.value);
    // }
  }
}