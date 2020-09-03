export class AppCategory {
  id: Object;
  title: string;
  parentId?: number;
  icon: string;
  isActive: boolean;
  link: string;
  isSubMenu: boolean;
}

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
