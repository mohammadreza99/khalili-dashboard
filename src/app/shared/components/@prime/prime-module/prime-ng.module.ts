import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MODULES } from ".";

@NgModule({
  exports: [MODULES],
  imports: [MODULES],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrimeNgModule {}
