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
        { label: 'تنظیمات صفحه اصلی', routerLink: ['/base/main-setting'] },
        {
          label: 'درباره فروشگاه',
          items: [
            { label: 'درباره ما', routerLink: ['/base/about'] },
            { label: 'شماره تلفن ها', routerLink: ['/base/phones'] },
            { label: 'شبکه های اجتماعی', routerLink: ['/base/socials'] },
            { label: 'اسلایدر', routerLink: ['/base/slider'] },
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
