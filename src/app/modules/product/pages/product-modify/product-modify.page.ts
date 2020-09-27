import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { ProductService } from '../../business/product.service';
import {
  AttributeByCategoryId,
  Info,
  Product,
} from '../../model/product.model';
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
import { DialogFormService } from '@app/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { DataService } from '@app/services/data.service';

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
  id;
  activeIndex = null;
  editMode: boolean = false;
  productImages: any;
  productDefaultImage: any;
  selectedCategoryAttributes: AttributeByCategoryId[];
  attributes: Info[];
  selectedCategory: TreeNode;
  convertedCategories: TreeNode[];
  convertedBrands: SelectItem[];
  convertedPointTypes: SelectItem[];
  convertedAttributes: SelectItem[];
  originalColors: any[];
  originalWarranries: any[];
  originalInsurance: any[];

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

  constructor(
    private productService: ProductService,
    private dataService: DataService,
    private basicService: BasicService,
    private route: ActivatedRoute,
    private dialogFormService: DialogFormService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.paramMap.get('index'))
      this.activeIndex = this.route.snapshot.paramMap.get('index');
    this.loadData();
    if (this.activeIndex == '0') this.getProductPrimaryData(this.id);
    if (this.activeIndex == '1') this.getProductAttributes(this.id);
    if (this.activeIndex == '2') this.getProductImageData(this.id);
    if (this.activeIndex == '3') this.getProductPointData(this.id);
    if (this.activeIndex == '4') this.getProductPriceData(this.id);
  }
  getProductPriceData(productId) {
    const secondary = this.secondaryFormGroup.controls;
    this.productService.getProductPriceData(productId).subscribe((res) => {
      console.log(res);

      // secondary['colorId']
    });
  }

  getProductImageData(productId) {
    this.productService.getProductImageData(productId).subscribe((res) => {
      console.log(res);
      res.forEach((img) => {
        this.dataService.getBase64ImageFromUrl(img.keyMedia, (dataUrl) => {
          this.productImages.push({
            keyMedia: dataUrl,
          });
        });
      });
    });
  }

  getProductPointData(productId) {
    this.productService.getProductPointData(productId).subscribe((res) => {
      let points = [];
      res.forEach((point) => {
        points.push(point.pointTypeId);
      });
      this.pointTypeFormGroup.controls['pointTypeId'].setValue(points);
    });
  }

  getProductAttributes(productId) {
    this.productService
      .getProductAttributes(productId)
      .subscribe((result: Info[]) => {
        this.productService
          .getProductPrimaryData(productId)
          .subscribe((product) => {
            this.productService
              .getAttributesByCatgoryId(product.categoryId)
              .subscribe((attributes: AttributeByCategoryId[]) => {
                let selectedCategoryAttributes = [];
                for (let i = 0; i < attributes.length; i++) {
                  Object.assign(attributes[i], { value: result[i].value });
                  selectedCategoryAttributes.push(attributes[i]);
                }
                this.selectedCategoryAttributes = selectedCategoryAttributes;
              });
          });
      });
  }

  getProductPrimaryData(productId) {
    this.productService.getProductPrimaryData(productId).subscribe((res) => {
      console.log(res);
      const primary = this.primaryFormGroup.controls;
      primary['brandId'].setValue(res.brandId);
      primary['commission'].setValue(res.commission);
      primary['name'].setValue(res.name);
      primary['nameEn'].setValue(res.nameEn);
      primary['description'].setValue(res.description);
      primary['descriptionSeo'].setValue(res.descriptionSeo);
      primary['gainPoints'].setValue(res.gainPoints.split(','));
      primary['weakPoints'].setValue(res.weakPoints.split(','));
      this.selectedCategory = res.categoryId;
      this.productService
        .getCategoryById(res.categoryId)
        .subscribe((category) => {
          let convertedCategories = this.productService.convertToTreeNodeList([
            category,
          ]);
          this.selectedCategory = convertedCategories[0];
        });
    });
  }

  onEditPrimary() {
    const p = {
      id: null,
      categoryId: null,
      brandId: null,
      commission: null,
      name: '',
      nameEn: '',
      description: '',
      descriptionSeo: '',
      gainPoints: '',
      weakPoints: '',
    };
    const primary = this.primaryFormGroup.controls;
    p.id = this.id;
    p.categoryId = this.selectedCategory.data.id;
    p.brandId = primary['brandId'].value;
    p.commission = primary['commission'].value;
    p.name = primary['name'].value;
    p.nameEn = primary['nameEn'].value;
    p.description = primary['description'].value;
    p.descriptionSeo = primary['descriptionSeo'].value;
    p.gainPoints = primary['gainPoints'].value.toString();
    p.weakPoints = primary['weakPoints'].value.toString();
    this.productService.updateProductPrimaryData(p).subscribe();
  }

  onEditPoints() {
    let point = {
      productId: this.id,
      pointTypeId: this.pointTypeFormGroup.value.pointTypeId,
    };
    this.productService.updateProductPointData(point).subscribe();
  }

  onEditAttributes() {}

  onEditImages() {}

  onEditSecondary() {}

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
    this.originalColors = await this.basicService
      .select<BaseColor>('Color')
      .toPromise();
    this.originalWarranries = await this.basicService
      .select<BaseWarranty>('Warranty')
      .toPromise();
    this.originalInsurance = await this.basicService
      .select<BaseInsurance>('Insurance')
      .toPromise();
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
    p.info = this.attributes;
    p.price.colorId = secondary['colorId'].value;
    p.price.warrantyId = secondary['warrantyId'].value;
    p.price.insuranceId = secondary['insuranceId'].value;
    p.price.period = secondary['period'].value;
    p.price.price = secondary['price'].value;
    p.price.disCountPrice = secondary['disCountPrice'].value;
    p.price.localCode = secondary['localCode'].value;
    p.price.qty = secondary['qty'].value;
    p.price.maxQty = secondary['maxQty'].value;
    p.point = this.pointTypeFormGroup.value.pointTypeId;
    return p;
  }

  onImageChange(args) {
    this.productImages = args;
  }

  onSelectCategory(event) {
    this.productService
      .getAttributesByCatgoryId(event.data.id)
      .subscribe((res: AttributeByCategoryId[]) => {
        console.log(res);

        this.selectedCategoryAttributes = res;
      });
  }

  onChangeAttributes(event) {
    this.attributes = event;
  }

  addProduct() {
    this.productService.insertProduct(this.createProduct()).subscribe((res) => {
      console.log(res);
    });
  }

  //////////////////////////////////////////////
  selectedPrices = [];
  getPriceConfig(value?: any) {
    return [
      {
        type: 'dropdown',
        formControlName: 'colorId',
        label: 'رنگ',
        labelWidth: 110,
        value: value?.colorId,
        dropdownItems: this.originalColors.map((item) => {
          return { label: item.title, value: item.id };
        }),
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        formControlName: 'warrantyId',
        label: 'گارانتی',
        value: value?.colorId,
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        dropdownItems: this.originalWarranries.map((item) => {
          return { label: item.title, value: item.id };
        }),
      },
      {
        type: 'dropdown',
        formControlName: 'insuranceId',
        value: value?.colorId,
        label: 'بیمه',
        labelWidth: 110,
        dropdownItems: this.originalInsurance.map((item) => {
          return { label: item.title, value: item.id };
        }),
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        formControlName: 'isReference',
        label: 'قیمت مرجع',
        value: value?.colorId,
        labelWidth: 110,
        dropdownItems: [
          { label: 'بله', value: true },
          { label: 'خیر', value: false },
        ],
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        formControlName: 'price',
        value: value?.colorId,
        label: 'قیمت',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        formControlName: 'disCountPrice',
        value: value?.colorId,
        label: 'تخفیف',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        formControlName: 'period',
        value: value?.colorId,
        label: 'حداکثر زمان ارسال',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        formControlName: 'localCode',
        value: value?.colorId,
        label: 'کد داخلی',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'تعداد',
        value: value?.colorId,
        formControlName: 'qty',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        labelWidth: 110,
      },
      {
        type: 'text',
        formControlName: 'maxQty',
        value: value?.colorId,
        label: 'بیشترین تعداد درخواست',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ] as DialogFormConfig[];
  }

  addPrice() {
    this.dialogFormService
      .show('افزودن قیمت', this.getPriceConfig(), '1000px', 'scroll')
      .onClose.subscribe((res) => {
        if (res) {
          this.selectedPrices.push(res);
        }
      });
  }

  editPrice(price) {
    this.dialogFormService
      .show('افزودن قیمت', this.getPriceConfig(price), '1000px')
      .onClose.subscribe((res) => {
        this.selectedPrices.push(res);
      });
  }
}
