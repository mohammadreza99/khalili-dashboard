export class User {
  mobileNo: string;
}

export class CheckOtpModel {
  mobileNo: string;
  oTPcode: string;
}

export class CheckPasswordModel {
  mobileNo: string;
  password: string;
}

export class ChangePasswordModel {
  password:string;
  oldPassword:string;
}
