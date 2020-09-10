export class Product {
  categoryId: number;
  brandId: number;
  commission: number;
  name: string;
  namEn: string;
  description: string;
  descriptionSeo: string;
  gainPoints: string;
  weakPoints: string;
  point: Point;
  info: Info[];
  media: Media[];
  price: Price;
}

export class ProductSearch {
  index: number;
  categoryId?: number;
  brandId?: number;
  name: string;
  nameEn: string;
  commission: number;
}

export class ProductSelect {
  id: Object;
  categoryId: number;
  categoryTitle: string;
  productCode: string;
  brandId: number;
  brandTitle: string;
  name: string;
  nameEn: string;
  description: string;
  gainPoints: string;
  weakPoints: string;
  insertDate: string;
  isActive: boolean;
  commission: number;
}

export class Info {
  attributeId: number;
  value: string;
}

export class Media {
  keyMedia: string;
  isDefault: boolean;
}

export class Point {
  pointTypeId: number;
}

export class Price {
  colorId: number;
  warrantyId: number;
  insurance: number;
  isReference: boolean;
  period: number;
  localCode: string;
  qty: number;
  maxQty: number;
}

export class DiscountInsertModel {
  title: string;
  code: string;
  expireDate: Date;
  maxUse: number;
  price: number;
  maxPrice: number;
  percent: number;
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
