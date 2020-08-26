import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { COMPONENTS } from '.';
import { PrimeModule } from '@prime/prime.module';
import { AgGridModule } from 'ag-grid-angular';
import { CellButtonComponent } from './components/table/cell-button/cell-button.component';
import { CellImageComponent } from './components/table/cell-image/cell-image.component';

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AgGridModule.withComponents([CellButtonComponent, CellImageComponent]),
    PrimeModule.forRoot(),
  ],
  exports: [
    ...COMPONENTS,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PrimeModule,
    AgGridModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
