import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { ProductService } from '../../business/product.service';
import {
  AppCategory,
  Info,
  Media,
  Price,
  Product,
} from '../../model/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  BaseAttribute,
  BaseBrand,
  BaseColor,
  BaseInsurance,
  BasePointType,
  BaseWarranty,
} from '@app/modules/basic/model/basic.model';
import { BasicService } from '@app/modules/basic/business/basic.service';

enum TabIndex {
  primary,
  fields,
  images,
  points,
  secondary,
}
@Component({
  selector: 'product-modify',
  templateUrl: './product-modify.page.html',
  styleUrls: ['./product-modify.page.scss'],
})
export class ProductModifyPage implements OnInit {
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];
  selectedCategory: TreeNode;

  originalBrands: BaseBrand[];
  convertedBrands: SelectItem[];

  originalPointTypes: BasePointType[];
  convertedPointTypes: SelectItem[];

  originalAttributes: BaseAttribute[];
  convertedAttributes: SelectItem[];

  originalColors: BaseColor[];
  convertedColors: SelectItem[];

  originalWarranries: BaseWarranty[];
  convertedWarranries: SelectItem[];

  originalInsurance: BaseInsurance[];
  convertedInsurance: SelectItem[];

  primaryFormGroup = new FormGroup({
    categoryId: new FormControl(null),
    brandId: new FormControl(null),
    commission: new FormControl(null),
    name: new FormControl(null),
    namEn: new FormControl(null),
    description: new FormControl(null),
    descriptionSeo: new FormControl(null),
    gainPoints: new FormControl(null),
    weakPoints: new FormControl(null),
  });
  secondaryFormGroup = new FormGroup({
    colorId: new FormControl(null),
    warrantyId: new FormControl(null),
    insuranceId: new FormControl(null),
    isReference: new FormControl(null),
    period: new FormControl(null),
    localCode: new FormControl(null),
    qty: new FormControl(null),
    maxQty: new FormControl(null),
  });
  poitTypeFormGroup = new FormGroup({
    pointTypeId: new FormControl(null),
  });
  activeIndex = 0;
  editMode: boolean = false;
  productImages: any;
  productDefaultImage: any;

  /*
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


 Info {
  attributeId: number;
  value: string;
}

 Media {
  keyMedia: string;
  isDefault: boolean;
}

Point {
  pointTypeId: number;
}

 Price {
  colorId: number;
  warrantyId: number;
  InsuranceId: number;
  isReference: boolean;
  period: number;
  localCode: string;
  qty: number;
  maxQty: number;
}
   */
  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.originalCategories = await this.productService
      .getCategories()
      .toPromise();
    this.convertedCategories = this.productService.convertToTreeNodeList(
      this.originalCategories
    );
    this.originalBrands = await this.basicService
      .select<BaseBrand>('Brand')
      .toPromise();
    this.convertedBrands = this.originalBrands.map((item) => {
      return { label: item.title, value: item.id };
    });
    this.originalPointTypes = await this.basicService
      .select<BasePointType>('PointType')
      .toPromise();
    this.convertedPointTypes = this.originalPointTypes.map((item) => {
      return { label: item.title, value: item.id };
    });
    this.originalColors = await this.basicService
      .select<BaseColor>('Color')
      .toPromise();
    this.convertedColors = this.originalColors.map((item) => {
      return { label: item.title, value: item.id };
    });
    this.originalWarranries = await this.basicService
      .select<BaseWarranty>('Warranty')
      .toPromise();
    this.convertedWarranries = this.originalWarranries.map((item) => {
      return { label: item.title, value: item.id };
    });
    this.originalInsurance = await this.basicService
      .select<BaseInsurance>('Insurance')
      .toPromise();
    this.convertedInsurance = this.originalInsurance.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  updateProduct() {}

  onDefaultImageChange($event) {}
  onImageSelect($event) {}
  onImageDelete($event) {}
}
