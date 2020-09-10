import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ProductRoutingModule } from '@app/modules/product/product-routing.module';
import { COMPONENTS } from '.';
@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [ProductRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProductModule {}
