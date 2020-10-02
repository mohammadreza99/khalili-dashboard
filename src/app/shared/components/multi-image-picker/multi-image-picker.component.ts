import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'multi-image-picker',
  templateUrl: './multi-image-picker.component.html',
  styleUrls: ['./multi-image-picker.component.scss'],
})
export class MultiImagePickerComponent implements OnInit {
  constructor(private dataService: DataService) {}

  @Input() images: { keyMedia?: any; isDefault?: any ; id?: any;}[];
  @Output() onChange = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onDelete = new EventEmitter();

  selectedImages: { keyMedia?: any; isDefault?: any; id?: any;}[] = [];

  ngOnInit() {
    if (this.images) {
      for (const item of this.images) {
        this.dataService.getBase64ImageFromUrl(item.keyMedia, (dataUrl) => {
          this.selectedImages.push({
            id:item.id,
            keyMedia: dataUrl,
            isDefault: item.isDefault,
          });
        });
      }
    }
  }

  onImageClick(i) {
    for (const item of this.selectedImages) {
      item.isDefault = false;
    }
    this.selectedImages[i].isDefault = true;
    this.onSelect.emit(this.selectedImages[i]);
  }

  onDeleteImageClick(event, index) {
    event.stopPropagation();
    this.onDelete.emit(this.selectedImages[index]);
    // this.onChange.emit(this.selectedImages);
    this.selectedImages.splice(index, 1);
  }

  onSelectImage(event: any) {
    const file: File = event.target.files[0];
    this.createImageFromBlob(file);
    // this.onSelect.emit(file);
    // this.onChange.emit(this.selectedImages);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.onload = () => {
      this.selectedImages.push({
        keyMedia: reader.result,
        isDefault: false,
      });
      this.onChange.emit(this.selectedImages);
    };
  }
}
