import { Component, OnInit, ViewChild } from '@angular/core';
import { BasicService } from '@app/modules/basic/business/basic.service';
import { DialogFormService } from '@app/services/dialog-form.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { Observable } from 'rxjs';
import { AppCategory, AppCategorySlider } from '../../model/product.model';
import * as moment from 'jalali-moment';
import { ProductService } from '../../business/product.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'category-slider',
  templateUrl: './category-slider.page.html',
  styleUrls: ['./category-slider.page.scss'],
})
export class CategorySliderPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<AppCategorySlider[]>;
  columnDefs: ColDef[];
  availabeCategories: AppCategory[];

  constructor(
    private productService: ProductService,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.productService.getCategorySliders();
    this.availabeCategories = await this.productService
      .getCategories()
      .toPromise();
    this.columnDefs = [
      {
        field: 'alt',
        headerName: 'alt',
      },
      {
        field: 'expireDateTime',
        headerName: 'انقضا',
        editable: true,
        cellEditor: 'datepickerEditor',
        cellEditorParams: (data) => {
          return {
            onChange: (params) => {
              const categorySlider = {
                id: params.rowData.id,
                expireDateTime: params.selectedDate,
                isActive: params.rowData.isActive,
                alt: params.rowData.alt,
                userId: params.rowData.userId,
                categoryId: params.rowData.categoryId,
                insertDate: params.rowData.insertDate,
                keyMedia: params.rowData.keyMedia,
              } as AppCategorySlider;
              this.productService
                .updateCategorySlider(categorySlider)
                .subscribe(() => this.table.updateTransaction(categorySlider));
            },
          };
        },
        cellRenderer: (data) => {
          if (data && data?.value?.selectedDate) {
            return moment(data.value.selectedDate).format('jYYYY/jMM/jDD');
          }
          return moment(data.value).format('jYYYY/jMM/jDD');
        },
      },
      {
        field: 'categoryId',
        headerName: 'دسته بندی',
        cellRenderer: (params) => {
          return this.categoryCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availabeCategories.map((category) => category.title),
        },
        onCellValueChanged: (params) => {
          params.data.categoryId = getByTitleCellRenderer(
            params.data.categoryId,
            this.availabeCategories
          );
        },
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
  }

  categoryCellRenderer(params) {
    return getByIdCellRenderer(params.data.categoryId, this.availabeCategories);
  }

  addCategorySlider() {
    this.dialogFormService
      .show('افزودن اسلایدر دسته بندی', this.formConfig())
      .onClose.subscribe((categorySlider: AppCategorySlider) => {
        let categorySliderObj = {
          alt: categorySlider.alt,
          categoryId: categorySlider.categoryId,
          isActive: categorySlider.isActive,
          keyMedia: categorySlider.keyMedia,
          expireDateTime: categorySlider.expireDateTime['dateObj'],
        } as AppCategorySlider;
        if (categorySlider)
          this.productService
            .insertCategorySlider(categorySliderObj)
            .subscribe((res) => this.table.addTransaction(categorySliderObj));
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
        type: 'dropdown',
        label: 'دسته بندی',
        dropdownItems: this.availabeCategories.map((item) => {
          return { label: item.title, value: item.id };
        }),
        labelWidth: 60,
        formControlName: 'categoryId',
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
      {
        type: 'hidden',
        formControlName: 'isActive',
        value: true,
      },
    ];
  }

  onCellValueChanged(event) {
    let updatedData: AppCategorySlider = event.data;
    let field: string = event.colDef.field;
    let value: string = event.value;
    if (field == 'isActive') {
      if (value === 'فعال') {
        updatedData.isActive = true;
        this.productService
          .activate('CategorySlider', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      } else if (value === 'غیرفعال') {
        updatedData.isActive = false;
        this.productService
          .deactivate('CategorySlider', updatedData)
          .subscribe(() => this.table.updateTransaction(updatedData));
      }
    } else
      this.productService
        .updateCategorySlider(updatedData)
        .subscribe(() => this.table.updateTransaction(updatedData));
  }

  onImageSelect(event) {
    const s: AppCategorySlider = {
      id: event.rowData.id,
      alt: event.rowData.alt,
      categoryId: event.rowData.categoryId,
      expireDateTime: event.rowData.expireDateTime,
      insertDate: event.rowData.insertDate,
      userId: event.rowData.userId,
      isActive: event.rowData.isActive,
      keyMedia: event.file,
    };

    this.productService
      .updateCategorySlider(s)
      .subscribe(() => this.table.updateTransaction(s));
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}

function getByIdCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.id == condtion) value = item.title;
  });
  return value;
}

function getByTitleCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.title == condtion) value = item.id;
  });
  return value;
}
