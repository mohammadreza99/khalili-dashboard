import { NgModule } from "@angular/core";
import { BeforeAfterDirective } from './before-after.directive';

@NgModule({
  declarations: [BeforeAfterDirective],
  exports: [BeforeAfterDirective],
})
export class PrimeDirectiveModule { }
