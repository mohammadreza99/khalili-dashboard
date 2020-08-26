import { PrimeDirection } from '../prime-type/prime-direction';

export class PrimeMessageOptions {
  escape?: boolean;
  closable?: boolean;
  layout?: PrimeDirection;
  constructor() {
    this.escape = true;
    this.closable = true;
    this.layout = 'rtl';
  }
}
