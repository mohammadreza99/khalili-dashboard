import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AttributeByCategoryId } from '@app/modules/product/model/product.model';

@Component({
  selector: 'fields',
  templateUrl: './fields.component.html',
  styleUrls: ['./fields.component.scss'],
})
export class FieldsComponent implements OnInit, OnChanges {
  @Input() categoryAttribute: AttributeByCategoryId;
  @Output() valueChange = new EventEmitter();

  form = new FormGroup({});
  attributeTypes = {
    1: 'Text',
    2: 'Number',
    3: 'Date',
    4: 'Text Area',
    5: 'Select',
    6: 'Multi Select',
    7: 'CheckBox',
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.form.addControl(
      this.categoryAttribute.attributeTitle.toString(),
      new FormControl(undefined)
    );
    if (this.categoryAttribute.isRequired) {
      this.form.controls[
        this.categoryAttribute.attributeTitle.toString()
      ].setValidators(Validators.required);
    }
  }

  ngOnInit() {
    this.form.addControl(
      this.categoryAttribute.attributeTitle.toString(),
      new FormControl(undefined)
    );
    if (this.categoryAttribute.isRequired) {
      this.form.controls[
        this.categoryAttribute.attributeTitle.toString()
      ].setValidators(Validators.required);
    }
    this.form.valueChanges.subscribe((res) => {
      this.valueChange.emit(res);
    });
  }

  onSubmit() {
    // if (this.form.valid) {
    //   this.dialogRef.close(this.form.value);
    // }
  }
}
