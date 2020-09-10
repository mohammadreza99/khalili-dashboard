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
    data: { title: 'attachment-types' },
    component: AttachmentTypesPage,
  },
  {
    path: 'attribute-categories',
    data: { title: 'attribute-categories' },
    component: AttributeCategoriesPage,
  },
  {
    path: 'attribute-values',
    data: { title: 'attribute-values' },
    component: AttributeValuesPage,
  },
  {
    path: 'attributes',
    data: { title: 'attributes' },
    component: AttributesPage,
  },
  {
    path: 'brands',
    data: { title: 'brands' },
    component: BrandsPage,
  },
  {
    path: 'cities',
    data: { title: 'cities' },
    component: CitiesPage,
  },
  {
    path: 'colors',
    data: { title: 'colors' },
    component: ColorsPage,
  },
  {
    path: 'districts',
    data: { title: 'districts' },
    component: DistrictsPage,
  },
  {
    path: 'holidays',
    data: { title: 'holidays' },
    component: HolidaysPage,
  },
  {
    path: 'insurances',
    data: { title: 'insurances' },
    component: InsurancesPage,
  },
  {
    path: 'jobs',
    data: { title: 'jobs' },
    component: JobsPage,
  },
  {
    path: 'point-types',
    data: { title: 'point-types' },
    component: PointTypesPage,
  },
  {
    path: 'shipping-hours',
    data: { title: 'shipping-hours' },
    component: ShippingHoursPage,
  },
  {
    path: 'states',
    data: { title: 'states' },
    component: StatesPage,
  },
  {
    path: 'warranties',
    data: { title: 'warranties' },
    component: WarrantiesPage,
  },
  {
    path: 'about',
    data: { title: 'about' },
    component: AboutPage,
  },
  {
    path: 'faq-categories',
    data: { title: 'about' },
    component: FaqCategoriesPage,
  },
  {
    path: 'faq',
    data: { title: 'about' },
    component: FaqPage,
  },
  {
    path: 'phones',
    data: { title: 'about' },
    component: PhonesPage,
  },
  {
    path: 'privacy',
    data: { title: 'about' },
    component: PrivacyPage,
  },
  {
    path: 'terms',
    data: { title: 'about' },
    component: TermsPage,
  },
  {
    path: 'socials',
    data: { title: 'about' },
    component: SocialsPage,
  },
  {
    path: 'slider',
    data: { title: 'about' },
    component: SliderPage,
  },
  {
    path: 'main-setting',
    data: { title: 'about' },
    component: MainSettingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasicRoutingModule {}
