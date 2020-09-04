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
        { label: 'رنگ ', routerLink: ['/home/base/colors'] },
        { label: 'گارانتی ', routerLink: ['/home/base/warranties'] },
        { label: 'بیمه ', routerLink: ['/home/base/insurances'] },
        {
          label: 'فیلد',
          items: [
            { label: 'فیلد', routerLink: ['/home/base/attributes'] },
            {
              label: 'دسته بندی فیلد',
              routerLink: ['/home/base/attribute-categories'],
            },
          ],
        },
        { label: 'استان ', routerLink: ['/home/base/states'] },
        { label: 'شهر', routerLink: ['/home/base/cities'] },
        { label: 'ناحیه ', routerLink: ['/home/base/districts'] },
        { label: 'شغل ', routerLink: ['/home/base/jobs'] },
        { label: 'برند', routerLink: ['/home/base/brands'] },
        {
          label: 'دسته بندی الحاقیات فروشگاه ',
          routerLink: ['/home/base/attachment-types'],
        },
        { label: 'تعطیلات فروشگاه اصلی', routerLink: ['/home/base/holidays'] },
        { label: 'ساعت تحویل', routerLink: ['/home/base/shipping-hours'] },
        { label: 'نظرسنجی امتیازی ', routerLink: ['/home/base/point-types'] },
        { label: 'دسته بندی محصولات', routerLink: ['/home/base/categories'] },
        {
          label: 'مدیریت سایت',
          items: [
            { label: 'درباره ما', routerLink: ['/home/base/about'] },
            { label: 'شماره تلفن ', routerLink: ['/home/base/phones'] },
            { label: 'شبکه اجتماعی', routerLink: ['/home/base/socials'] },
            { label: 'اسلایدر', routerLink: ['/home/base/slider'] },
            { label: 'تنظیمات صفحه اصلی', routerLink: ['/home/base/main-setting'] },
            {
              label: 'دسته بندی سوالات متداول',
              routerLink: ['/home/base/faq-categories'],
            },
            { label: 'سوالات متداول', routerLink: ['/home/base/faq'] },
            { label: 'حریم شخصی', routerLink: ['/home/base/privacy'] },
            { label: 'مقررات', routerLink: ['/home/base/terms'] },
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
