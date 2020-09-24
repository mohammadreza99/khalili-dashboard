import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { ProductService } from '../../business/product.service';
import { AttributeByCategoryId, Product } from '../../model/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
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
  selectedCategory: TreeNode;
  convertedCategories: TreeNode[];
  convertedBrands: SelectItem[];
  convertedPointTypes: SelectItem[];
  convertedAttributes: SelectItem[];
  convertedColors: SelectItem[];
  convertedWarranries: SelectItem[];
  convertedInsurance: SelectItem[];

  primaryFormGroup = new FormGroup({
    brandId: new FormControl(null),
    commission: new FormControl(null),
    name: new FormControl(null),
    nameEn: new FormControl(null),
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
    price: new FormControl(null),
    disCountPrice: new FormControl(null),
    localCode: new FormControl(null),
    qty: new FormControl(null),
    maxQty: new FormControl(null),
  });
  pointTypeFormGroup = new FormGroup({
    pointTypeId: new FormControl(null),
  });

  activeIndex = 0;
  editMode: boolean = false;
  productImages: any;
  productDefaultImage: any;
  selectedCategoryFields: AttributeByCategoryId[];

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const originalCategories = await this.productService
      .getCategories()
      .toPromise();
    this.convertedCategories = this.productService.convertToTreeNodeList(
      originalCategories
    );
    const originalBrands = await this.basicService
      .select<BaseBrand>('Brand')
      .toPromise();
    this.convertedBrands = originalBrands.map((item) => {
      return { label: item.title, value: item.id };
    });
    const originalPointTypes = await this.basicService
      .select<BasePointType>('PointType')
      .toPromise();
    this.convertedPointTypes = originalPointTypes.map((item) => {
      return { label: item.title, value: item.id };
    });
    const originalColors = await this.basicService
      .select<BaseColor>('Color')
      .toPromise();
    this.convertedColors = originalColors.map((item) => {
      return { label: item.title, value: item.id };
    });
    const originalWarranries = await this.basicService
      .select<BaseWarranty>('Warranty')
      .toPromise();
    this.convertedWarranries = originalWarranries.map((item) => {
      return { label: item.title, value: item.id };
    });
    const originalInsurance = await this.basicService
      .select<BaseInsurance>('Insurance')
      .toPromise();
    this.convertedInsurance = originalInsurance.map((item) => {
      return { label: item.title, value: item.id };
    });
  }

  onSaveClick() {
    this.productService.insertProduct(this.createProduct()).subscribe((res) => {
      console.log(res);
    });
  }

  createProduct(): Product {
    const p = new Product();
    const primary = this.primaryFormGroup.controls;
    const secondary = this.secondaryFormGroup.controls;
    p.categoryId = this.selectedCategory.data.id;
    p.brandId = primary['brandId'].value;
    p.commission = primary['commission'].value;
    p.name = primary['name'].value;
    p.nameEn = primary['nameEn'].value;
    p.description = primary['description'].value;
    p.descriptionSeo = primary['descriptionSeo'].value;
    p.gainPoints = primary['gainPoints'].value.toString();
    p.weakPoints = primary['weakPoints'].value.toString();
    p.media = this.productImages;
    p.price.colorId = secondary['colorId'].value;
    p.price.warrantyId = secondary['warrantyId'].value;
    p.price.insuranceId = secondary['insuranceId'].value;
    p.price.period = secondary['period'].value;
    p.price.localCode = secondary['localCode'].value;
    p.price.qty = secondary['qty'].value;
    p.price.maxQty = secondary['maxQty'].value;
    p.point = this.pointTypeFormGroup.value;
    return p;
  }

  onImageChange(args) {
    this.productImages = args;
  }

  onSelectCategory(event) {
    this.productService
      .getAttributesByCatgoryId(event.data.id)
      .subscribe((res: AttributeByCategoryId[]) => {
        this.selectedCategoryFields = res;
      });
  }

  onChangeFields(event) {
    console.log(event);
  }
}
