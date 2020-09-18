import { Type } from '@angular/core';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { TagComponent } from './components/tag/tag.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SingleImagePickerComponent } from './components/single-image-picker/single-image-picker.component';
import { TableComponent } from './components/table/table.component';
import { ContainerComponent } from './components/container/container.component';
import { CellButtonComponent } from './components/table/cell-button/cell-button.component';
import { CellImageComponent } from './components/table/cell-image/cell-image.component';
import { CellDatepickerComponent } from './components/table/cell-datepicker/cell-datepicker.component';
import { CellTimepickerComponent } from './components/table/cell-timepicker/cell-timepicker.component';
import { SafePipe } from './directives/safe.pipe';
import { MultiImagePickerComponent } from './components/multi-image-picker/multi-image-picker.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
export const COMPONENTS: Type<any>[] = [
  DialogFormComponent,
  MultiImagePickerComponent,
  TagComponent,
  ToolbarComponent,
  SidenavMenuComponent,
  NavbarMenuComponent,
  LoadingComponent,
  SingleImagePickerComponent,
  TableComponent,
  ContainerComponent,
  CellButtonComponent,
  CellImageComponent,
  CellDatepickerComponent,
  CellTimepickerComponent,
  SafePipe,
  CategorySliderComponent,
];
