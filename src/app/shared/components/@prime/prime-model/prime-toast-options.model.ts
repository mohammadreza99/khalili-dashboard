import { PrimePosition } from '../prime-type/prime-position';
import { PrimeDirection } from '../prime-type/prime-direction';

export class PrimeToastOptions {
  preventOpenDuplicates?: boolean;
  preventDuplicates?: boolean;
  position?: PrimePosition;
  layout: PrimeDirection;
  constructor() {
    this.preventOpenDuplicates = false;
    this.preventDuplicates = false;
    this.position = 'top-right';
    this.layout = 'rtl';
  }
}
