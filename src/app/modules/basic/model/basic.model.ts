export class BaseColor {
  id: Object;
  title: string;
  code: string;
  isActive: boolean;
}

export class BaseWarranty {
  id: Object;
  title: string;
  month: number;
  isActive: boolean;
}

export class BaseInsurance {
  id: Object;
  title: string;
  month: number;
  isActive: boolean;
}

export class BaseAttributeCategory {
  id: Object;
  title: string;
  isActive: boolean;
}

export class BaseAttribute {
  id: Object;
  attributeCategoryId: number;
  title: string;
  attributeTypeId: number;
  isRequired: boolean;
  isSystem: boolean;
  isActive: boolean;
}

export class BaseAttributeValue {
  id: Object;
  attributeId: number;
  parentId: number;
  value: string;
  isActive: boolean;
}

export class BaseJob {
  id: Object;
  title: string;
  isActive: boolean;
}

export class BaseState {
  id: Object;
  title: string;
  isActive: boolean;
}

export class BaseCity {
  id: Object;
  StateId: number;
  title: string;
  isActive: boolean;
}

export class BaseDistrict {
  id: Object;
  cityId: number;
  title: string;
  isActive: boolean;
}

export class BaseBrand {
  id: Object;
  title: string;
  titleEn: string;
  isOrginal: boolean;
  isActive: boolean;
}

export class BaseAttachmentType {
  id: Object;
  title: string;
  isActive: boolean;
}

export class BaseHoliday {
  id: Object;
  date: Date;
  title: string;
  isActive: boolean;
}

export class BaseShippingHour {
  id: Object;
  startTime: Date;
  endTime: Date;
  title: string;
  maxOrder: number;
  isActive: boolean;
}

export class BasePointType {
  id: Object;
  title: string;
  isActive: boolean;
}

export class AppCategory {
  id: Object;
  title: string;
  parentId?: number;
  icon: string;
  isActive: boolean;
  link: string;
  isSubMenu: boolean;
}

export class SiteAbout {
  id: Object;
  description: string;
  shortDescription: string;
  isActive: boolean;
  userId: Object;
  insertDate: Date;
}

export class SiteTelPhone {
  id: Object;
  telNo: string;
  telShow: string;
  userId: Object;
  isActive: boolean;
  insertDate: Date;
}

export class SiteSocialMedia {
  id: Object;
  title: string;
  link: string;
  icon: string;
  alt: string;
  userId: Object;
  isActive: boolean;
  insertDate: Date;
}

export class SiteFAQCategory {
  id: Object;
  title: string;
  keyMedia: string;
  userId: Object;
  isActive: boolean;
  insertDate: Date;
}

export class SiteTerms {
  id: Object;
  title: string;
  description: string;
  userId: Object;
  isActive: boolean;
  insertDate: Date;
}

export class SitePrivacy {
  id: Object;
  title: string;
  description: string;
  userId: Object;
  isActive: boolean;
  insertDate: Date;
}
