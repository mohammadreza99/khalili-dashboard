import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PrimeMessageService } from '@prime/prime-service/prime-message.service';
import { PrimeConfirmService } from '@prime/prime-service/prime-confirm.service';
import { PrimeToastService } from '@prime/prime-service/prime-toast.service';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private messager: PrimeMessageService,
    private confirmer: PrimeConfirmService,
    private toaster: PrimeToastService,
    private http: HttpClient
  ) {}

  /////////////////////////////////////////////////////////////////////////////
  //                                GENERAL                                  //
  /////////////////////////////////////////////////////////////////////////////
  //#region GENERAL
  private SIDE_MENU_ITEMS: MenuItem[] = [
    {
      label: 'داشبورد',
      icon: 'pi pi-pw pi-file',
      routerLink: ['/'],
    },
    {
      label: 'پــــایــه',
      icon: 'pi pi-pw pi-file',
      items: [
        { label: 'رنگ ها', routerLink: ['/base/colors'] },
        { label: 'گارانتی ها', routerLink: ['/base/warranties'] },
        { label: 'بیمه ها', routerLink: ['/base/insurances'] },
        {
          label: 'فیلدها',
          items: [
            { label: 'فیلدها', routerLink: ['/base/attributes'] },
            {
              label: 'دسته بندی فیلدها',
              routerLink: ['/base/attribute-categories'],
            },
            // {
            //   label: 'مقادیر اولیه فیلدها',
            //   routerLink: ['/base/attribute-values'],
            // },
          ],
        },
        {
          label: 'محل ها',
          items: [
            { label: 'استان ها', routerLink: ['/base/states'] },
            { label: 'شهرها', routerLink: ['/base/cities'] },
            { label: 'ناحیه ها', routerLink: ['/base/districts'] },
          ],
        },
        { label: 'شغل ها', routerLink: ['/base/jobs'] },
        { label: 'برندها', routerLink: ['/base/brands'] },
        {
          label: 'دسته بندی الحاقیات فروشگاه ها',
          routerLink: ['/base/attachment-types'],
        },
        { label: 'تعطیلات فروشگاه اصلی', routerLink: ['/base/holidays'] },
        { label: 'ساعت های تحویل', routerLink: ['/base/shipping-hours'] },
        { label: 'نظرسنجی امتیازی ها', routerLink: ['/base/point-types'] },
        { label: 'دسته بندی محصولات', routerLink: ['/base/categories'] },
        {
          label: 'درباره فروشگاه',
          items: [
            { label: 'درباره ما', routerLink: ['/base/about'] },
            { label: 'شماره تلفن ها', routerLink: ['/base/phones'] },
            { label: 'شبکه های اجتماعی', routerLink: ['/base/socials'] },
            {
              label: 'دسته بندی سوالات متداول',
              routerLink: ['/base/faq-categories'],
            },
            { label: 'سوالات متداول', routerLink: ['/base/faq'] },
            { label: 'حریم شخصی', routerLink: ['/base/privacy'] },
            { label: 'مقررات', routerLink: ['/base/terms'] },
          ],
        },
      ],
    },
  ];

  get sideMenuItems(): MenuItem[] {
    return this.SIDE_MENU_ITEMS;
  }

  hasValue(value: any) {
    return value !== null && value !== undefined;
  }

  getValue<T>(observable: Observable<T>) {
    return observable.pipe(filter(this.hasValue)).toPromise();
  }

  itemIsEmpty(item: any): boolean {
    return (
      item.parameter === null ||
      item.parameter === undefined ||
      item.parameter === '' ||
      item.parameter.length === 0
    );
  }

  cancellationConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'عملیات لغو شوند؟',
        header: 'لغو عملیات',
        icon: 'fa fa-exclamation-triangle',
      },
      vcRef
    );
  }

  deletionConfirm(vcRef: ViewContainerRef): Promise<any> {
    return this.confirmer.show(
      {
        message: 'آیا از حذف این مورد اطمینان دارید؟',
        header: 'حذف',
        icon: 'fa fa-times',
      },
      vcRef
    );
  }

  successfullMessage(vcRef: ViewContainerRef): Promise<any> {
    return this.toaster.show(
      {
        severity: 'success',
        summary: 'عملیات با موفقیت انجام شد.',
      },
      vcRef
    );
  }

  cloneObj(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  shallowCloneObj(obj) {
    return Object.assign({}, obj);
  }

  checkConnection(): Observable<boolean> {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((observer: Observer<boolean>) => {
        observer.next(navigator.onLine);
        observer.complete();
      })
    );
  }

  getImage(imageUrl: string, options: any) {
    return this.http.get(imageUrl, options);
  }

  getDirtyControls(
    form: FormGroup,
    type: 'object' | 'array' | 'names' = 'object'
  ): {} {
    const kv = Object.entries(form.controls).filter((val) => val[1].dirty);
    const result = {
      object: () =>
        kv.reduce(
          (accum, val) => Object.assign(accum, { [val[0]]: val[1].value }),
          {}
        ),
      array: () => kv.map((val) => val[1]),
      names: () => kv.map((val) => val[0]),
    }[type]();
    return Object.assign(result, { id: form.get('id').value });
  }

  // onActionClick(event) {
  //   const selectedJob: BaseJob = event.rowData;
  //   switch (event.action) {
  //     case 'edit':
  //       this.dialogFormService
  //         .show('ویرایش شغل', this.formConfig(selectedJob))
  //         .onClose.subscribe((updatedJob: BaseJob) => {
  //           this.basicService
  //             .update<BaseJob>('Job', updatedJob)
  //             .subscribe((res) => this.table.updateTransaction(selectedJob));
  //         });
  //       break;
  //     case 'activate':
  //       this.activeDialog(selectedJob.title).then(() => {
  //         this.basicService
  //           .activate('Job', selectedJob)
  //           .subscribe((res) => this.table.updateTransaction(selectedJob));
  //       });
  //       break;
  //     case 'deactivate':
  //       this.deactiveDialog(selectedJob.title).then(() => {
  //         this.basicService
  //           .deactivate('Job', selectedJob)
  //           .subscribe((res) => this.table.updateTransaction(selectedJob));
  //       });
  //       break;
  //   }
  // }

  // activeDialog(title: string) {
  //   return this.confirmService.show(
  //     {
  //       header: 'فعالسازی - ' + title,
  //       message: `مورد ${title} فعال شود؟`,
  //     },
  //     this.vcRef
  //   );
  // }

  // deactiveDialog(title: string) {
  //   return this.confirmService.show(
  //     {
  //       header: 'غیرفعالسازی - ' + title,
  //       message: `مورد ${title} غیرفعال شود؟`,
  //     },
  //     this.vcRef
  //   );
  // }

  // formConfig(values?: BaseJob): DialogFormConfig[] {
  //   const config: DialogFormConfig[] = [
  //     {
  //       type: 'hidden',
  //       value: values?.id,
  //       formControlName: 'id',
  //     },
  //     {
  //       type: 'hidden',
  //       value: values?.isActive ? values?.isActive : true,
  //       formControlName: 'isActive',
  //     },
  //     {
  //       type: 'text',
  //       label: 'عنوان',
  //       labelWidth: 60,
  //       formControlName: 'title',
  //       value: values?.title,
  //       errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
  //     },
  //   ];
  //   return config;
  // }

  //#endregion GENERAL
}
