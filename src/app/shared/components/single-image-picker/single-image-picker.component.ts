import {
  Component,
  OnInit,
  AfterViewInit,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { PrimeInputBaseComponent } from '@prime/prime-element/prime-input-base/prime-input-base.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { PrimeInputFileComponent } from '@prime/prime-element/prime-input-file/prime-input-file.component';
import { DataService } from '@app/services/data.service';

@Component({
  selector: 'ag-single-image-picker',
  templateUrl: './single-image-picker.component.html',
  styleUrls: ['./single-image-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SingleImagePickerComponent),
      multi: true,
    },
  ],
})
export class SingleImagePickerComponent
  extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  constructor(private dataService: DataService) {
    super();
  }

  @ViewChild(PrimeInputFileComponent, { static: true })
  upload: PrimeInputFileComponent;
  @Output() onSelect = new EventEmitter();

  imageToShow: any;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  onSelectImage(event: any) {
    const file: File = event.files[0];
    this.value = file;
    this.createImageFromBlob(file);
    this.onSelect.emit(this.value);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    if (image) {
      reader.readAsDataURL(image);
    }
    reader.onload = () => {
      this.imageToShow = reader.result;
      if (this.hasValueAccessor) {
        this.controlOnChange(this.imageToShow);
      }
    };
  }

  clear() {
    this.upload.clear();
    this.value = null;
    this.imageToShow = null;
    if (this.hasValueAccessor) {
      this.controlOnChange(this.value);
    }
  }
}
