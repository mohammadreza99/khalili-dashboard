import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'multi-image-picker',
  templateUrl: './multi-image-picker.component.html',
  styleUrls: ['./multi-image-picker.component.scss'],
})
export class MultiImagePickerComponent implements OnInit {
  constructor() {}
  
  @Input() images = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  @Input() defaultImage = 3;
  @Output() defaultChange = new EventEmitter();
  @Output() imageSelect = new EventEmitter();
  @Output() imageDelete = new EventEmitter();

  ngOnInit() {}

  uploadFile(event) {
    this.imageSelect.emit(event);
  }

  onImageClick(i) {
    this.defaultImage = this.images[i];
    this.defaultChange.emit(this.defaultImage);
  }

  onDeleteImageClick(event, index) {
    event.stopPropagation();
    this.imageDelete.emit(this.images[index]);
    this.images.splice(index, 1);
  }
}
