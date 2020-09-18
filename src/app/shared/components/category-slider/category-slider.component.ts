import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '@app/services/data.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @Input() images: { keyMedia?: any; expireDate?: any; alt?: any }[];
  @Output() selectionChange = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  selectedImages: { keyMedia?: any; expireDate?: any; alt?: any }[] = [];

  ngOnInit() {}

  onSelectImage(event: any) {
    const file: File = event.target.files[0];
    this.createImageFromBlob(file);
    this.onSelect.emit(file);
    this.selectionChange.emit(this.selectedImages);
  }

  getImage(imageUrl: string) {
    const headers = { responseType: 'blob' };
    return this.dataService.getImage(imageUrl, headers);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.onload = () => {
      this.selectedImages.push({
        keyMedia: reader.result,
        expireDate: moment(),
        alt: '',
      });
      this.selectionChange.emit(this.selectedImages);
    };
  }

  onDeleteImageClick(event, index) {
    event.stopPropagation();
    this.onDelete.emit(this.selectedImages[index]);
    this.selectionChange.emit(this.selectedImages);
    this.selectedImages.splice(index, 1);
  }

  onExpireDateChange(event, index) {
    this.selectedImages[
      index
    ].expireDate = (event.dateObj as Date).toISOString();
    this.selectionChange.emit(this.selectedImages);
  }

  onAltChange(event, index) {
    this.selectedImages[index].alt = event;
    this.selectionChange.emit(this.selectedImages);
  }
}
