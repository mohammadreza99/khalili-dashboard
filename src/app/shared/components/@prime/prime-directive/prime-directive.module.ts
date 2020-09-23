import { NgModule } from "@angular/core";
import { BeforeAfterDirective } from './before-after.directive';
import { NumberOnlyDirective } from './number-only.directive';

@NgModule({
  declarations: [BeforeAfterDirective,NumberOnlyDirective],
  exports: [BeforeAfterDirective,NumberOnlyDirective],
})
export class PrimeDirectiveModule { }
