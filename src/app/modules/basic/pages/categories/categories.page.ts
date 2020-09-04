import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng';
import { AppCategory } from '../../model/basic.model';
import { ProductService } from '@app/modules/product/business/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  displayDetailDialog = false;
  dialogTitle: string;
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];
  selectedParentNode: TreeNode;

  constructor(private productService: ProductService) {}
  form = new FormGroup({
    id: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    icon: new FormControl("", Validators.required),
    link: new FormControl("", Validators.required),
    parentId: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isSubMenu: new FormControl(false, Validators.required),
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  async loadCategories() {
    this.originalCategories = await this.productService
      .getCategories()
      .toPromise();
    this.convertedCategories = this.convertToTreeNodeList(
      this.originalCategories
    );
  }

  onCategoryEdit(node: TreeNode) {
    this.displayDetailDialog = true;
    this.dialogTitle = 'ویرایش دسته : ' + node.label;
    this.form.controls['title'].setValue(node.label);
    this.form.controls['icon'].setValue(node.data.icon);
    this.form.controls['link'].setValue(node.data.link);
    this.form.controls['id'].setValue(node.data.id);
    this.form.controls['parentId'].setValue(node.data.parentId);
    this.form.controls['isActive'].setValue(node.data.isActive);
    this.form.controls['isSubMenu'].setValue(node.data.isSubMenu);
    this.selectedParentNode = this.convertToTreeNode(
      this.originalCategories.find((c) => c.id == node.data.parentId)
    );
  }

  onCategoryAdd() {
    this.displayDetailDialog = true;
    this.dialogTitle = 'افزودن دسته';
    this.selectedParentNode = null;
    this.clearInputs();
  }

  onNodeSelect(selected) {
    this.form.controls['parentId'].setValue(selected.node.data.id);
  }

  onSubmitDialog() {
    let node = {
      id: this.form.controls['id'].value,
      icon: this.form.controls['icon'].value,
      link: this.form.controls['link'].value,
      parentId: this.form.controls['parentId'].value,
      title: this.form.controls['title'].value,
      isActive: this.form.controls['isActive'].value,
      isSubMenu: this.form.controls['isSubMenu'].value,
    };
    this.displayDetailDialog = false;
    if (this.form.controls['id'].value)
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
    this.clearInputs();
  }

  clearInputs() {
    this.form.controls['id'].setValue(null);
    this.form.controls['title'].setValue(null);
    this.form.controls['icon'].setValue('');
    this.form.controls['link'].setValue('');
    this.form.controls['parentId'].setValue(null);
    this.form.controls['isActive'].setValue(true);
    this.form.controls['isSubMenu'].setValue(false);
  }

  convertToTreeNodeList(items: AppCategory[]) {
    let result: TreeNode[] = [];
    items.forEach((item) => {
      const t: TreeNode = {
        label: item.title,
        data: {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          icon: item.icon,
          isActive: item.isActive,
          link: item.link,
          isSubMenu: item.isSubMenu,
        },
        children: this.getTreeNodeChildrenFromCategory(item),
        selectable: true,
        key: item.id.toString(),
      };
      if (t.children.length == 0) {
        t.icon = 'pi pi-minus';
      }
      if (item.parentId == null) result.push(t);
    });
    return result;
  }

  convertToTreeNode(item: AppCategory) {
    if (item) {
      let result: TreeNode = {
        label: item.title,
        data: {
          id: item.id,
          title: item.title,
          parentId: item.parentId,
          icon: item.icon,
          isActive: item.isActive,
          link: item.link,
          isSubMenu: item.isSubMenu,
        },
        children: this.getTreeNodeChildrenFromCategory(item),
        selectable: true,
        key: item.id.toString(),
      };
      return result;
    }
  }

  getTreeNodeChildrenFromCategory(category: AppCategory) {
    let children: TreeNode[] = [];
    this.originalCategories.forEach((item) => {
      if (item.parentId == category.id) {
        const childNode: TreeNode = {
          label: item.title,
          data: {
            id: item.id,
            title: item.title,
            parentId: item.parentId,
            icon: item.icon,
            isActive: item.isActive,
            link: item.link,
            isSubMenu: item.isSubMenu,
          },
          children: this.getTreeNodeChildrenFromCategory(item),
          selectable: true,
          key: item.id.toString(),
        };
        if (childNode.children.length == 0) {
          childNode.icon = 'pi pi-minus';
        }
        children.push(childNode);
      }
    });
    return children;
  }

  
}
