import { Injector } from '@angular/core';

export class Global {
  public static Injector: Injector;
  public static ShowWattingDialog: boolean = false;
  public static CurrentDate: string;
}

export enum FormMode {
  Clear,
  Insert,
  Update,
}

export class Result<T> {
  data: Array<T>;
  success: boolean;
  message: Array<string>;
  error: Array<string>;
}

export class SingleId {
  id: number;
}

export class IdTitle {
  id: number;
  title: string;
}
