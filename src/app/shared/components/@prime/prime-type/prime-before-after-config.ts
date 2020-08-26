import { PrimeColor } from './prime-color';
import { PrimePosition } from './prime-position';
import { PrimeIconRotation, PrimeIconStyle } from './prime-icon';


export type PrimeBeforeAfterConfig =
  | {
    type: "button";
    label?: string;
    color?: PrimeColor;
    icon?: string;
    iconPos?: PrimePosition;
    iconStylePrefix?: PrimeIconStyle;
    iconSpin?: boolean;
    iconRotation?: PrimeIconRotation;
  }
  | {
    type: "icon";
    icon?: string;
    stylePrefix?: PrimeIconStyle;
    rotation?: PrimeIconRotation;
    spin?: boolean;
  }
  | {
    type: "text";
    text?: string;
  };
