import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteAbout } from '../../model/basic.model';
import { BasicService } from '../../business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { DataService } from '@app/services/data.service';
@Component({
  selector: 'about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  aboutSubmitted: boolean;
  rowData$: Observable<SiteAbout[]>;
  columnDefs = [
    {
      field: 'description',
      headerName: 'متن درباره ما',
      editable: false,
    },
    {
      field: 'shortDescription',
      headerName: 'متن کوتاه',
      editable: false,
    },
  ];

  constructor(
    private basicService: BasicService,
    private dialogFormService: DialogFormService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.basicService.select<SiteAbout>('About');
  }

  addAbout() {
    this.dialogFormService
      .show('افزودن درباره ما', this.formConfig(), '1500px')
      .onClose.subscribe((brand: SiteAbout) => {
        if (brand)
          this.basicService
            .insert<SiteAbout>('About', brand)
            .subscribe((res) => this.table.addTransaction(brand));
      });
  }

  formConfig(value?: SiteAbout): DialogFormConfig[] {
    return [
      {
        type: 'hidden',
        value: value?.id,
      },
      {
        type: 'editor',
        label: 'متن درباره ما',
        labelWidth: 100,
        formControlName: 'description',
        value: value?.description,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'متن کوتاه',
        labelWidth: 100,
        value: value?.shortDescription,
        formControlName: 'shortDescription',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  onCellValueChanged(event) {
    let updatedData: SiteAbout = event.data;
    this.basicService
      .update<SiteAbout>('About', updatedData)
      .subscribe(() => this.table.updateTransaction(updatedData));
  }

  onActionClick(event) {
    const data = event.rowData as SiteAbout;
    switch (event.action) {
      case 'update':
        this.dialogFormService
          .show('ویرایش درباره ما', this.formConfig(data), '1500px')
          .onClose.subscribe((about: SiteAbout) => {
            this.basicService
              .update<SiteAbout>('About', about)
              .subscribe((res) => {
                this.table.updateTransaction(about);
                this.aboutSubmitted = true;
              });
          });
        break;
    }
  }
}
