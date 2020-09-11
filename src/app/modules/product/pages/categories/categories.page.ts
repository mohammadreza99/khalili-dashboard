import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng';
import { ProductService } from '@app/modules/product/business/product.service';
import { AppCategory, CategoryAttribute } from '../../model/product.model';
import { BasicService } from '@app/modules/basic/business/basic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    this.originalCategories = await this.productService
      .getCategories()
      .toPromise();
    this.convertedCategories = this.productService.convertToTreeNodeList(
      this.originalCategories
    );
  }

  onCategoryEdit(node: TreeNode) {
    this.router.navigate(['/product/categories/modify', node.data.id]);
  }
}
