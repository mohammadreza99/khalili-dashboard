import { Component, OnInit } from '@angular/core';
import { TreeNode, SelectItem } from 'primeng';
import { ProductService } from '../../business/product.service';
import { AppCategory } from '../../model/product.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseBrand, BasePointType } from '@app/modules/basic/model/basic.model';
import { BaseService } from '@app/services/base.service';
import { BasicService } from '@app/modules/basic/business/basic.service';

@Component({
  selector: 'product-modify',
  templateUrl: './product-modify.page.html',
  styleUrls: ['./product-modify.page.scss'],
})
export class ProductModifyPage implements OnInit {
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];
  originalBrands: BaseBrand[];
  convertedBrands: SelectItem[];
  availablePointTypes: BasePointType[];
  convertedPointTypes: SelectItem[];

  activeIndex = 0;
  form = new FormGroup({
    name: new FormControl(null),
  });
  editMode: boolean = false;

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.productService.setProductModifyStepIndex(0);
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
    this.availablePointTypes = await this.basicService
      .select<BasePointType>('PointType')
      .toPromise();
  }

  updateProduct() {}

  goNext() {
    if (this.form.valid) {
      this.productService.setProductModifyStepIndex(1);
      this.router.navigate(['/product/modify/fields']);
    }
  }
}
