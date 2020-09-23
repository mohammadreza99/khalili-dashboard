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
  product = new Product();

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

  onSaveClick() {
    this.createProduct();
    console.log(this.product);

    this.productService
      .insertProduct<Product>(this.product).subscribe((res) => {
        console.log(res);
      });
  }

  createProduct() {
    this.product.info =[{ attributeId: 2, value: 'string'}];
    this.product.categoryId = this.selectedCategory.data.id;
    this.product.brandId = this.primaryFormGroup.controls['brandId'].value;
    this.product.commission = this.primaryFormGroup.controls[
      'commission'
    ].value;
    this.product.name = this.primaryFormGroup.controls['name'].value;
    this.product.namEn = this.primaryFormGroup.controls['namEn'].value;
    this.product.description = this.primaryFormGroup.controls[
      'description'
    ].value;
    this.product.descriptionSeo = this.primaryFormGroup.controls[
      'descriptionSeo'
    ].value;
    this.product.gainPoints = this.primaryFormGroup.controls[
      'gainPoints'
    ].value.toString();
    this.product.weakPoints = this.primaryFormGroup.controls[
      'weakPoints'
    ].value.toString();
    this.product.media = this.productImages;
    this.product.price.colorId = this.secondaryFormGroup.controls[
      'colorId'
    ].value;
    this.product.price.warrantyId = this.secondaryFormGroup.controls[
      'warrantyId'
    ].value;
    this.product.price.insuranceId = this.secondaryFormGroup.controls[
      'insuranceId'
    ].value;
    this.product.price.period = this.secondaryFormGroup.controls[
      'period'
    ].value;
    this.product.price.localCode = this.secondaryFormGroup.controls[
      'localCode'
    ].value;
    this.product.price.qty = this.secondaryFormGroup.controls['qty'].value;
    this.product.price.maxQty = this.secondaryFormGroup.controls[
      'maxQty'
    ].value;
    this.product.point = this.poitTypeFormGroup.value.pointTypeId;
  }

  updateProduct() {}

  onImageChange(args) {
    this.productImages = args;
  }
}

