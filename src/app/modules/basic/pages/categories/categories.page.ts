import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng';
import { AppCategory } from '../../model/basic.model';
import { ProductService } from '@app/modules/product/business/product.service';

@Component({
  selector: 'categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  displayEditDialog = false;
  dialogTitle: string;
  originalCategories: AppCategory[];
  convertedCategories: TreeNode[];
  selectedTreeNode: TreeNode;
  selectedParentNode: TreeNode;

  constructor(private productService: ProductService) {}

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
    this.displayEditDialog = true;
    this.dialogTitle = 'ویرایش دسته : ' + node.label;
    this.selectedTreeNode = node;
    this.selectedParentNode = this.convertToTreeNode(
      this.originalCategories.find((c) => c.id == node.data.parentId)
    );
  }

  onNodeSelect(node: TreeNode) {}

  onSubmitEditDialog() {}

  addCategory() {}

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
