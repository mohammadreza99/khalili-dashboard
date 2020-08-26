import { PrimeMessageSeverities } from '../prime-type/prime-message-severities';

export class PrimeMessage {
  severity?: PrimeMessageSeverities;
  summary?: string;
  detail?: string;
  id?: any;
  key?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  constructor() {
    this.severity = 'info';
    this.life = 3000;
    this.sticky = false;
    this.closable = true;
    this.summary = null;
    this.detail = null;
    this.id = null;
    this.data = null;
  }
}
