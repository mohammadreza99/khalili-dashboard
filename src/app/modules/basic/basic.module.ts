import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { BasicRoutingModule } from './basic-routing.module';


@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [BasicRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class BasicModule {}
