import { PrimeValidationType } from '../prime-type/prime-validation';

export class PrimeError {
  type: PrimeValidationType;
  message: string;
  value?: any;
}
