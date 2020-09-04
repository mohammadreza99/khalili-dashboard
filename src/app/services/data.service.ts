import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

import { PrimeConfirmService } from '@prime/prime-service/prime-confirm.service';
import { PrimeToastService } from '@prime/prime-service/prime-toast.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(
    private confirmer: PrimeConfirmService,
    private toaster: PrimeToastService,
    private http: HttpClient
  ) {}

  private SIDE_MENU_ITEMS: MenuItem[] = [
    {
      label: 'مدیریت اطلاعات پایه',
      icon: 'pi pi-pw pi-file',
      items: [
        { label: 'رنگ ', routerLink: ['/base/colors'] },
        { label: 'گارانتی ', routerLink: ['/base/warranties'] },
        { label: 'بیمه ', routerLink: ['/base/insurances'] },
        {
          label: 'فیلد',
          items: [
            { label: 'فیلد', routerLink: ['/base/attributes'] },
            {
              label: 'دسته بندی فیلد',
              routerLink: ['/base/attribute-categories'],
            },
          ],
        },
        { label: 'استان ', routerLink: ['/base/states'] },
        { label: 'شهر', routerLink: ['/base/cities'] },
        { label: 'ناحیه ', routerLink: ['/base/districts'] },
        { label: 'شغل ', routerLink: ['/base/jobs'] },
        { label: 'برند', routerLink: ['/base/brands'] },
        {
          label: 'دسته بندی الحاقیات فروشگاه ',
          routerLink: ['/base/attachment-types'],
        },
        { label: 'تعطیلات فروشگاه اصلی', routerLink: ['/base/holidays'] },
        { label: 'ساعت تحویل', routerLink: ['/base/shipping-hours'] },
        { label: 'نظرسنجی امتیازی ', routerLink: ['/base/point-types'] },
        { label: 'دسته بندی محصولات', routerLink: ['/base/categories'] },
        {
          label: 'مدیریت سایت',
          items: [
            { label: 'درباره ما', routerLink: ['/base/about'] },
            { label: 'شماره تلفن ', routerLink: ['/base/phones'] },
            { label: 'شبکه اجتماعی', routerLink: ['/base/socials'] },
            { label: 'اسلایدر', routerLink: ['/base/slider'] },
            { label: 'تنظیمات صفحه اصلی', routerLink: ['/base/main-setting'] },
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

  getImage(imageUrl: string, options: any) {
    return this.http.get(imageUrl, options);
  }
}
