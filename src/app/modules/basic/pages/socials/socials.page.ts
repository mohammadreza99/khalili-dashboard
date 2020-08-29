import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { SiteSocialMedia } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'socials',
  templateUrl: './socials.page.html',
  styleUrls: ['./socials.page.scss'],
})
export class SocialsPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  rowData$: Observable<SiteSocialMedia[]>;
  columnDefs = [
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'link',
      headerName: 'لینک',
    },
    {
      field: 'alt',
      headerName: 'alt',
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
    this.rowData$ = this.basicService.select<SiteSocialMedia>('SocialMedia');
  }

  activityCellRenderer(params) {
    return booleanCellRenderer(params.data.isActive);
  }

  addSocialMedia() {
    this.dialogFormService
      .show('افزودن شبکه اجتماعی', this.formConfig())
      .onClose.subscribe((socialMedia: SiteSocialMedia) => {
        if (socialMedia)
          this.basicService
            .insert<SiteSocialMedia>('SocialMedia', socialMedia)
            .subscribe((res) => this.table.addTransaction(socialMedia));
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 60,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'لینک',
        labelWidth: 60,
        formControlName: 'link',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'alt',
        labelWidth: 60,
        formControlName: 'alt',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 60,
        formControlName: 'icon',
      },
      {
        type: 'hidden',
        value: true,
        formControlName: 'isActive',
      },
    ] as DialogFormConfig[];
  }

  onImageSelect(event) {
    const s: SiteSocialMedia = {
      id: event.rowData.id,
      title: event.rowData.title,
      insertDate: event.rowData.insertDate,
      userId: event.rowData.userId,
      isActive: event.rowData.isActive,
      icon: event.file,
      alt: event.rowData.alt,
      link: event.rowData.link,
    };

    this.basicService
      .update<SiteSocialMedia>('SocialMedia', s)
      .subscribe(() => this.table.updateTransaction(s));
  }

  onCellValueChanged(event) {
    let updatedData: SiteSocialMedia = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.basicService
          .activate('SocialMedia', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.basicService
          .deactivate('SocialMedia', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.basicService
        .update<SiteSocialMedia>('SocialMedia', updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
