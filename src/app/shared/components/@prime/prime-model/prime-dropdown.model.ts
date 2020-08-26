export class PrimeDropdownItem {
  label?: string;
  value: any;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}

export class PrimeDropdownGroup {
  label: string;
  value?: any;
  items: PrimeDropdownItem[];
}
