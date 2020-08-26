import { Component, OnInit } from "@angular/core";

@Component({
  selector: "image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  constructor() {}

  list = [1, 2, 3, 4,4,4,4,4,4,4,];
  coverImage;

  ngOnInit() {}

  uploadFile($event) {

  }

  onImageClick(i) {
    this.coverImage = this.list[i];
  }

  onDeleteImageClick(event, index) {
    event.stopPropagation();
    this.list.splice(index, 1);
  }
}
