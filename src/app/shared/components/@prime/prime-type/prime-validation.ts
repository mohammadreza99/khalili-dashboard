export type PrimeValidationType =
  | "min"
  | "max"
  | "required"
  | "email"
  | "minlength"
  | "maxlength"
  | "pattern"
  | "nullValidator";

export interface PrimeValidationValue {
  value: number | string | boolean;
  errorMessage: string;
}

export type PrimeValidations = {
  [validationType in PrimeValidationType]?: PrimeValidationValue;
};
