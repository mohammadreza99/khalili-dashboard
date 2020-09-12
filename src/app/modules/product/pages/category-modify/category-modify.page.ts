import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicService } from '@app/modules/basic/business/basic.service';
import { BaseAttribute } from '@app/modules/basic/model/basic.model';
import { TreeNode } from 'primeng';
import { ProductService } from '../../business/product.service';
import { AppCategory } from '../../model/product.model';

@Component({
  selector: 'category-modify',
  templateUrl: './category-modify.page.html',
  styleUrls: ['./category-modify.page.scss'],
})
export class CategoryModifyPage implements OnInit {
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];
  originalAttributes: BaseAttribute[];
  convertedAttributes: any[];
  selectedParentNode: TreeNode;
  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    icon: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    parentId: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isSubMenu: new FormControl(false),
  });
  editMode = false;

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.loadCategory(id);
    }
  }

  async loadCategory(id) {
    // const category = await this.productService.getCategoryById(id).toPromise();
    this.form.patchValue({
      title: '',
      icon: '',
      link: '',
      id: '',
      parentId: '',
      isActive: '',
      isSubMenu: '',
    });
    // this.selectedParentNode = this.productService.convertToTreeNode(
    //   this.originalCategories.find((c) => c.id == category.parentId),
    //   this.originalCategories
    // );
  }

  async loadCategories() {
    this.originalCategories = await this.productService
      .getCategories()
      .toPromise();
    this.convertedCategories = this.productService.convertToTreeNodeList(
      this.originalCategories
    );
    this.originalAttributes = await this.basicService
      .select<BaseAttribute>('Attribute')
      .toPromise();
    this.convertedAttributes = this.originalAttributes.map((item) => {
      return {
        title: item.title,
        attributeId: item.id,
        isFilter: false,
        order: 0,
      };
    });
  }

  onNodeSelect(selected) {
    this.form.controls['parentId'].setValue(selected.node.data.id);
  }

  onSubmitClick() {
    let node = this.form.value;
    if (this.editMode)
      this.productService
        .updateCategories<AppCategory>(node)
        .subscribe((res) => this.loadCategories());
    else {
      if (node.parentId) node.isSubMenu = true;
      else node.isSubMenu = false;
      this.productService
        .insertCategories<AppCategory>(node)
        .subscribe((res) => this.loadCategories());
    }
    this.form.reset();
  }
}
// MultiSelect Deselect Tips
// if (event.value.map((a) => a.id == event.itemValue.id).length == 1) {
//   checked = true;
// }
