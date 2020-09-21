import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsPage } from './pages/colors/colors.page';
import { AttachmentTypesPage } from './pages/attachment-types/attachment-types.page';
import { AttributeCategoriesPage } from './pages/attribute-categories/attribute-categories.page';
import { AttributeValuesPage } from './pages/attribute-values/attribute-values.page';
import { AttributesPage } from './pages/attributes/attributes.page';
import { BrandsPage } from './pages/brands/brands.page';
import { CitiesPage } from './pages/cities/cities.page';
import { DistrictsPage } from './pages/districts/districts.page';
import { HolidaysPage } from './pages/holidays/holidays.page';
import { InsurancesPage } from './pages/insurances/insurances.page';
import { JobsPage } from './pages/jobs/jobs.page';
import { PointTypesPage } from './pages/point-types/point-types.page';
import { ShippingHoursPage } from './pages/shipping-hours/shipping-hours.page';
import { StatesPage } from './pages/states/states.page';
import { WarrantiesPage } from './pages/warranties/warranties.page';
import { AboutPage } from './pages/about/about.page';
import { SocialsPage } from './pages/socials/socials.page';
import { TermsPage } from './pages/terms/terms.page';
import { PrivacyPage } from './pages/privacy/privacy.page';
import { PhonesPage } from './pages/phones/phones.page';
import { FaqPage } from './pages/faq/faq.page';
import { FaqCategoriesPage } from './pages/faq-categories/faq-categories.page';
import { SliderPage } from './pages/slider/slider.page';
import { MainSettingPage } from './pages/main-setting/main-setting.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'colors',
    pathMatch: 'full',
  },
  {
    path: 'attachment-types',
    data: { title: 'الحاقیات فروشگاه' },
    component: AttachmentTypesPage,
  },
  {
    path: 'attribute-categories',
    data: { title: 'دسته بندی فیلد' },
    component: AttributeCategoriesPage,
  },
  {
    path: 'attribute-values',
    data: { title: 'مقادیر فیلد' },
    component: AttributeValuesPage,
  },
  {
    path: 'attributes',
    data: { title: 'فیلد' },
    component: AttributesPage,
  },
  {
    path: 'brands',
    data: { title: 'برند' },
    component: BrandsPage,
  },
  {
    path: 'cities',
    data: { title: 'شهر' },
    component: CitiesPage,
  },
  {
    path: 'colors',
    data: { title: 'رنگ' },
    component: ColorsPage,
  },
  {
    path: 'districts',
    data: { title: 'محله' },
    component: DistrictsPage,
  },
  {
    path: 'holidays',
    data: { title: 'تعطیلات فروشگاه' },
    component: HolidaysPage,
  },
  {
    path: 'insurances',
    data: { title: 'بیمه' },
    component: InsurancesPage,
  },
  {
    path: 'jobs',
    data: { title: 'شغل' },
    component: JobsPage,
  },
  {
    path: 'point-types',
    data: { title: 'نظرسنجی امتیازی' },
    component: PointTypesPage,
  },
  {
    path: 'shipping-hours',
    data: { title: 'ساعات تحویل' },
    component: ShippingHoursPage,
  },
  {
    path: 'states',
    data: { title: 'استان' },
    component: StatesPage,
  },
  {
    path: 'warranties',
    data: { title: 'گارانتی' },
    component: WarrantiesPage,
  },
  {
    path: 'about',
    data: { title: 'درباره ما' },
    component: AboutPage,
  },
  {
    path: 'faq-categories',
    data: { title: 'دسته بندی سوالات متداول' },
    component: FaqCategoriesPage,
  },
  {
    path: 'faq',
    data: { title: 'سوالات متداول' },
    component: FaqPage,
  },
  {
    path: 'phones',
    data: { title: 'تلفن' },
    component: PhonesPage,
  },
  {
    path: 'privacy',
    data: { title: 'حریم خصوصی' },
    component: PrivacyPage,
  },
  {
    path: 'terms',
    data: { title: 'مقررات' },
    component: TermsPage,
  },
  {
    path: 'socials',
    data: { title: 'شبکه اجتماعی' },
    component: SocialsPage,
  },
  {
    path: 'slider',
    data: { title: 'اسلایدر' },
    component: SliderPage,
  },
  {
    path: 'main-setting',
    data: { title: 'تنظیمات اصلی' },
    component: MainSettingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule {}
