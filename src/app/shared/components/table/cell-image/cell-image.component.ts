import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'ag-cell-image',
  templateUrl: './cell-image.component.html',
  styleUrls: ['./cell-image.component.scss'],
})
export class CellImageComponent implements ICellRendererAngularComp, OnInit {
  params: any;
  selectedImage;
  imageToShow;
  field: string;
  id: string;

  constructor(public dataService: DataService) {}

  agInit(params: any): void {
    this.params = params;
    this.field = params.field;
    this.imageToShow = this.params.node.data[this.field];
  }

  refresh(params: any): boolean {
    return true;
  }

  onSelectImage(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.selectedImage = reader.result;
      const params = {
        field: this.field,
        event,
        file: this.selectedImage,
        rowData: this.params.node.data,
      };
      this.params.onSelect(params);
    };
  }

  ngOnInit() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
  }
}
