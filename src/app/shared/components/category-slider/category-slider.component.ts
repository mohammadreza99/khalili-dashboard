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

  @Input() images: { keyMedia?: any; expireDateTime?: any; alt?: any }[];
  @Output() onChange = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  selectedImages: { keyMedia?: any; expireDateTime?: any; alt?: any }[] = [];

  ngOnInit() {}

  onSelectImage(event: any) {
    const file: File = event.target.files[0];
    this.createImageFromBlob(file);
    this.onSelect.emit(file);
    this.onChange.emit(this.selectedImages);
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
        expireDateTime: moment(),
        alt: '',
      });
      this.onChange.emit(this.selectedImages);
    };
  }

  onDeleteImageClick(event, index) {
    event.stopPropagation();
    this.onDelete.emit(this.selectedImages[index]);
    this.onChange.emit(this.selectedImages);
    this.selectedImages.splice(index, 1);
  }

  onexpireDateTimeChange(event, index) {
    this.selectedImages[
      index
    ].expireDateTime = (event.dateObj as Date);
    this.onChange.emit(this.selectedImages);
  }

  onAltChange(event, index) {
    this.selectedImages[index].alt = event;
    this.onChange.emit(this.selectedImages);
  }
}
