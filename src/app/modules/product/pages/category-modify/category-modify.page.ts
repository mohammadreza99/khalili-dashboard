import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasicService } from '@app/modules/basic/business/basic.service';
import { BaseAttribute } from '@app/modules/basic/model/basic.model';
import { ColDef } from 'ag-grid-community';
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
  selectedParentCategory: TreeNode;
  categoryId: number;

  editMode = false;
  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    icon: new FormControl('', Validators.required),
    link: new FormControl('', Validators.required),
    parentId: new FormControl(null, Validators.required),
    isActive: new FormControl(true, Validators.required),
    isSubMenu: new FormControl(false),
  });

  originalAttributes: BaseAttribute[];
  convertedAttributes: any[];
  attributesColumnDefs: ColDef[] = [
    {
      headerName: 'عنوان',
      field: 'title',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      editable: false,
    },
    {
      field: 'isFilter',
      headerName: 'فیلتر باشد',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['فعال', 'غیرفعال'],
      },
      filter: false,
      sortable: false,
      cellRenderer: this.filteringCellRenderer,
    },
    {
      field: 'order',
      headerName: 'ترتیب',
    },
  ];
  selectedAttributes: any[];

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
    this.loadCategories();
    if (this.categoryId) {
      this.editMode = true;
      this.loadCategory(this.categoryId);
    }
  }

  async loadCategory(id: number) {
    const category = await this.productService.getCategoryById(id).toPromise();
    this.form.patchValue({
      title: category.title,
      icon: category.icon,
      link: category.link,
      id: category.id,
      parentId: category.parentId,
      isActive: category.isActive,
      isSubMenu: category.isSubMenu,
    });
    this.selectedParentCategory = this.productService.convertToTreeNode(
      this.originalCategories.find((c) => c.id == category.parentId),
      this.originalCategories
    );
    if (!this.selectedParentCategory)
      this.selectedParentCategory = this.convertedCategories[0];
  }

  async loadCategories() {
    this.originalCategories = await this.productService
      .getCategories()
      .toPromise();
    const convertedCategories: TreeNode[] = this.productService.convertToTreeNodeList(
      this.originalCategories
    );
    this.convertedCategories = [
      {
        children: convertedCategories,
        key: '-1',
        label: 'ریشه اصلی',
        parent: undefined,
        selectable: true,
      },
    ];
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
    if (!this.categoryId)
      this.selectedParentCategory = this.convertedCategories[0];
  }

  onParentCategorySelect(selected) {
    if (selected.node.data)
      this.form.controls['parentId'].setValue(selected.node.data.id);
    else this.form.controls['parentId'].setValue(null);
  }

  filteringCellRenderer(params) {
    return booleanCellRenderer(params.data.isFilter);
  }

  onAttributeSelected(event) {
    //  event.node.data.title
  }

  onSelectionChanged(event) {}

  onSubmitClick() {
    let node = this.form.value;
    if (this.editMode)
      this.productService
        .updateCategory<AppCategory>(node)
        .subscribe((res) => this.loadCategories());
    else {
      if (node.parentId) node.isSubMenu = true;
      else node.isSubMenu = false;
      this.productService
        .insertCategory<AppCategory>(node)
        .subscribe((res) => this.loadCategories());
    }
    this.form.reset();
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
