import { PrimeDirection } from '../prime-type/prime-direction';
import { PrimePosition } from '../prime-type/prime-position';

export class PrimeConfirmOptions {
  message?: string;
  header?: string;
  icon?: string;
  key?: string;
  closable?: boolean;
  acceptLabel?: string;
  rejectLabel?: string;
  acceptVisible?: boolean;
  rejectVisible?: boolean;
  layout?: PrimeDirection;
  position?: PrimePosition;
  blockScroll?: boolean;
  defaultFocus?: 'accept' | 'reject' | 'close' | 'none';
  constructor() {
    this.key = null;
    this.acceptLabel = 'بله';
    this.rejectLabel = 'خیر';
    this.acceptVisible = true;
    this.rejectVisible = true;
    this.blockScroll = true;
    this.closable = true;
    this.layout = 'rtl';
    this.defaultFocus = 'none';
    this.position = 'center';
  }
}
