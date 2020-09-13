import { Injectable, ViewContainerRef } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { PrimeConfirmService } from '@prime/prime-service/prime-confirm.service';
import { PrimeToastService } from '@prime/prime-service/prime-toast.service';
import { BaseService } from './base.service';

@Injectable({ providedIn: 'root' })
export class DataService extends BaseService {
  constructor(
    private confirmer: PrimeConfirmService,
    private toaster: PrimeToastService
  ) {
    super();
  }

  private SIDE_MENU_ITEMS: MenuItem[] = [
    {
      label: 'مدیریت اطلاعات پایه',
      items: [
        { label: 'رنگ ', routerLink: ['/base/colors'], icon: 'fa fa-minus' },
        {
          label: 'گارانتی ',
          routerLink: ['/base/warranties'],
          icon: 'fa fa-minus',
        },
        {
          label: 'بیمه ',
          routerLink: ['/base/insurances'],
          icon: 'fa fa-minus',
        },

        { label: 'استان ', routerLink: ['/base/states'], icon: 'fa fa-minus' },
        { label: 'شهر', routerLink: ['/base/cities'], icon: 'fa fa-minus' },
        {
          label: 'ناحیه ',
          routerLink: ['/base/districts'],
          icon: 'fa fa-minus',
        },
        { label: 'شغل ', routerLink: ['/base/jobs'], icon: 'fa fa-minus' },
        { label: 'برند', routerLink: ['/base/brands'], icon: 'fa fa-minus' },
        {
          label: 'دسته بندی الحاقیات فروشگاه ',
          routerLink: ['/base/attachment-types'],
          icon: 'fa fa-minus',
        },
        {
          label: 'تعطیلات فروشگاه اصلی',
          routerLink: ['/base/holidays'],
          icon: 'fa fa-minus',
        },
        {
          label: 'ساعت تحویل',
          routerLink: ['/base/shipping-hours'],
          icon: 'fa fa-minus',
        },
        {
          label: 'نظرسنجی امتیازی ',
          routerLink: ['/base/point-types'],
          icon: 'fa fa-minus',
        },
        {
          label: 'دسته بندی فیلد',
          routerLink: ['/base/attribute-categories'],
          icon: 'fa fa-minus',
        },
        {
          label: 'فیلد',
          routerLink: ['/base/attributes'],
          icon: 'fa fa-minus',
        },
      ],
    },
    {
      label: 'مدیریت سایت',
      items: [
        {
          label: 'درباره ما',
          routerLink: ['/base/about'],
          icon: 'fa fa-minus',
        },
        {
          label: 'شماره تلفن ',
          routerLink: ['/base/phones'],
          icon: 'fa fa-minus',
        },
        {
          label: 'شبکه اجتماعی',
          routerLink: ['/base/socials'],
          icon: 'fa fa-minus',
        },
        { label: 'اسلایدر', routerLink: ['/base/slider'], icon: 'fa fa-minus' },
        {
          label: 'تنظیمات صفحه اصلی',
          routerLink: ['/base/main-setting'],
          icon: 'fa fa-minus',
        },
        {
          label: 'دسته بندی سوالات متداول',
          routerLink: ['/base/faq-categories'],
          icon: 'fa fa-minus',
        },
        {
          label: 'سوالات متداول',
          routerLink: ['/base/faq'],
          icon: 'fa fa-minus',
        },
        {
          label: 'حریم شخصی',
          routerLink: ['/base/privacy'],
          icon: 'fa fa-minus',
        },
        { label: 'مقررات', routerLink: ['/base/terms'], icon: 'fa fa-minus' },
      ],
    },
    {
      label: 'مدیریت محصولات',
      items: [
        {
          label: 'دسته بندی محصولات',
          routerLink: ['/product/categories/list'],
          icon: 'fa fa-minus',
        },
        {
          label: 'اسلایدر دسته بندی محصولات',
          routerLink: ['/product/categories/slider'],
          icon: 'fa fa-minus',
        },
        {
          label: 'محصولات',
          routerLink: ['/product/list'],
          icon: 'fa fa-minus',
        },
        {
          label: 'کد تخفیف',
          routerLink: ['/product/discount'],
          icon: 'fa fa-minus',
        },
        {
          label: 'بازدید محصولات',
          routerLink: ['/product/views'],
          icon: 'fa fa-minus',
        },
        {
          label: 'علاقه مندی کاربران',
          routerLink: ['/product/favorites'],
          icon: 'fa fa-minus',
        },
        {
          label: 'نظرات کاربران',
          routerLink: ['/product/comments'],
          icon: 'fa fa-minus',
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

  getImage(imageUrl: string, options?: any) {
    return this.get('DownloadMedia?key=' + imageUrl, 'json', options);
  }
}
