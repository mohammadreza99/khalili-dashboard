import { Component, Input, forwardRef } from '@angular/core';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Observable } from 'rxjs';
import { Global } from '@app/app.global';

const noop = () => {};
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FilePickerComponent),
  multi: true,
};

@Component({
  selector: 'filepicker',
  template: `<p-fileUpload
    #file
    [name]="name"
    mode="basic"
    [accept]="accept"
    auto="true"
    customUpload="true"
    (uploadHandler)="uploadHandler($event, file)"
    [chooseLabel]="title"
    [disabled]="disabled"
  ></p-fileUpload>`,
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class FilePickerComponent implements ControlValueAccessor {
  @Input() name: string;
  @Input() title: string;
  @Input() accept: string;
  @Input() disabled: boolean = false;

  innerValue: any;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  uploadHandler($event: any, input: any) {
    let that = this;
    let file: File = $event.files[0];
    this.readFileToBase64(file).subscribe((fileInfo) => {
      that.value = fileInfo.data;
      input.clear();
    });
  }

  readFileToBase64(file: File): Observable<FileInfo> {
    let that = this;
    return new Observable<FileInfo>((observer) => {
      let fileReader: FileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onloadstart = function () {
        Global.ShowWattingDialog = true;
      };
      fileReader.onloadend = function (e) {
        Global.ShowWattingDialog = false;

        let fileInfo: FileInfo = new FileInfo();
        fileInfo.name = file.name;
        fileInfo.data = fileReader.result;

        observer.next(fileInfo);
      };

      fileReader.onerror = function (e) {
        observer.error(e);
      };
    });
  }

  get value(): any {
    return this.innerValue;
  }

  set value(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      this.onChangeCallback(value);
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}

class FileInfo {
  name: string;
  data: string | ArrayBuffer;
}
