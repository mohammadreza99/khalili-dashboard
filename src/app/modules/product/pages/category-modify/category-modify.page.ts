import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicService } from '@app/modules/basic/business/basic.service';
import { BaseAttribute } from '@app/modules/basic/model/basic.model';
import { ColDef } from 'ag-grid-community';
import { TreeNode } from 'primeng';
import { ProductService } from '../../business/product.service';
import { AppCategory, CategoryAttribute } from '../../model/product.model';

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
  firstSelectedAttributes: any[]=[] ;
  loadCategoryAttributes=false;
  newSelectedAttributes: CategoryAttribute[] = [];
  newSelectedAttributeIds: any[] = [];

  constructor(
    private productService: ProductService,
    private basicService: BasicService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.categoryId = +this.route.snapshot.paramMap.get('id');
    await this.loadCategories();
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

      if (this.convertedAttributes){
        this.loadCategoryAttributes=true;
        category.attribute.forEach((attribute) => {
          let convertedAttribute = this.convertedAttributes.find(
            (attr) => attribute.attributeId == attr.attributeId
          );
          if (convertedAttribute)
            this.firstSelectedAttributes.push(convertedAttribute);
        });
      }
      
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
    let attributeId = event.data.attributeId;
    if (!this.newSelectedAttributeIds.find((id) => id == attributeId))
      this.newSelectedAttributeIds.push(attributeId);
    else {
      let index = this.newSelectedAttributeIds.findIndex(
        (id) => id == attributeId
      );
      this.newSelectedAttributeIds.splice(index, 1);
    }
  }

  createAttributesCategory() {
    this.convertedAttributes.forEach((attr) => {
      if (this.newSelectedAttributeIds.includes(attr.attributeId))
        this.newSelectedAttributes.push({
          attributeId: attr.attributeId,
          isFilter: attr.isFilter == 'فعال' ? true : false,
          order: +attr.order,
        });
    });
  }

  onSubmitClick() {
    this.createAttributesCategory();
    let node = this.form.value;
    Object.assign(node, { attribute: this.newSelectedAttributes });
    if (this.editMode)
      this.productService.updateCategory<AppCategory>(node).subscribe((res) => {
        this.router.navigate(['/product/categories/list']);
      });
    else {
      if (node.parentId) node.isSubMenu = true;
      else node.isSubMenu = false;
      this.productService.insertCategory<AppCategory>(node).subscribe((res) => {
        this.router.navigate(['/product/categories/list']);
      });
    }
    this.form.reset();
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'فعال' : 'غیرفعال'}</span></div>`;
}
