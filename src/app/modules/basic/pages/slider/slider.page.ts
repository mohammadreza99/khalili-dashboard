import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteSlider } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteSlider[]>;
  columnDefs = [
    {
      field: 'alt',
      headerName: 'alt',
    },
    {
      field: 'expireDateTime',
      headerName: 'انقضا',
    },
    {
      field: 'isActive',
      headerName: 'وضعیت',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      cellRenderer: this.activityCellRenderer,
    },
  ];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.basicService.select<SiteSlider>('Slider');
  }

  addSlider() {
    this.dialogFormService
      .show('افزودن اسلایدر', this.formConfig())
      .onClose.subscribe((slider: SiteSlider) => {
        if (slider)
          this.basicService
            .insert<SiteSlider>('Slider', slider)
            .subscribe((res) => this.table.addTransaction(slider));
      });
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'alt',
        labelWidth: 60,
        formControlName: 'alt',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'date-picker',
        label: 'انقضا',
        labelWidth: 60,
        formControlName: 'expireDateTime',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 60,
        formControlName: 'keyMedia',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    let updatedData: SiteSlider = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('Slider', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('Slider', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SiteSlider>('Slider', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }

  onImageSelect(event) {
    const s: SiteSlider = {
      id: event.rowData.id,
      alt: event.rowData.alt,
      expireDateTime: event.rowData.expireDateTime,
      insertDate: event.rowData.insertDate,
      userId: event.rowData.userId,
      isActive: event.rowData.isActive,
      keyMedia: event.file,
    };

    this.basicService
      .update<SiteSlider>('Slider', s)
      .subscribe(() => this.table.updateTransaction(s));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-slider:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
