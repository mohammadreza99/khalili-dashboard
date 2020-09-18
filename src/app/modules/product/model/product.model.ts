//////////////////////////////////////////////////////////////
//                        Product                           //
//////////////////////////////////////////////////////////////
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
  InsuranceId: number;
  isReference: boolean;
  period: number;
  localCode: string;
  qty: number;
  maxQty: number;
}

export class Discount {
  id: number;
  title: string;
  code: string;
  expireDate: string;
  MaxUse: number;
  price: number;
  maxPrice: number;
  percent: number;
  isActive?: boolean;
  insertDate?: string;
  orderCountUse?: number;
}

export class ProductView {
  productName: string;
  productId: string;
  productCode: string;
  categoryTitle: string;
  countView: number;
}

export class ProductFavorite {
  productName: string;
  productId: string;
  productCode: string;
  categoryTitle: string;
  countFavorit: number;
}

export class ProductComment {
  id: number;
  fullName: string;
  productName: string;
  productId: string;
  productCode: string;
  categoryTitle: string;
  commentTitle: string;
  gainPoints: string;
  weakPoints: string;
  description: string;
  isProposal?: number;
  insertDate: string;
  fullNameVerifyingUser: string;
  isActive: boolean;
}

//////////////////////////////////////////////////////////////
//                        Category                          //
//////////////////////////////////////////////////////////////
export class AppCategory {
  id: Object;
  title: string;
  parentId?: number;
  icon: string;
  isActive: boolean;
  link: string;
  isSubMenu: boolean;
  attribute: CategoryAttribute[];
  slider: AppCategorySlider[];
}

export class CategoryAttribute {
  attributeId: Object;
  isFilter: boolean;
  order: number;
}

export class AppCategorySlider {
  alt: string;
  keyMedia: string;
  expireDateTime: Date;
}

export class AttributeByCategoryId {
  id: Object;
  title: string;
  attributeCategoryId: number;
  attributeCategoryTitle: string;
  attributeTypeId: number;
  isRequired: boolean;
  attributeValueId: number;
  attributeValueValue: string;
  apiValue: string;
}
