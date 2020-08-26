import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';
import { PrimeInputFileMode } from '../../prime-type/prime-input-file-mode';
import { FileUpload } from 'primeng';

@Component({
  selector: 'prm-input-file',
  templateUrl: './prime-input-file.component.html',
  styleUrls: ['./prime-input-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PrimeInputFileComponent),
      multi: true,
    },
  ],
})
export class PrimeInputFileComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  @ViewChild('upload', { static: true }) upload: FileUpload;

  @Input() url: string;
  @Input() multiple: boolean = false;
  @Input() auto: boolean = false;
  @Input() accept: string = '';
  @Input() method: string = 'POST';
  @Input() captionText: string = '';
  @Input() maxFileSize: number = null;
  @Input() previewWidth: number = 50;
  @Input() fileLimit: number = null;
  @Input() mode: PrimeInputFileMode = 'basic';
  @Input() chooseLabel: string = 'انتخاب';
  @Input() uploadLabel: string = 'آپلود';
  @Input() cancelLabel: string = 'انصراف';
  @Input() files: any[] = [];
  @Input() headers: HttpHeaders;
  @Input() showUploadButton: boolean = true;
  @Input() showCancelButton: boolean = true;
  @Input() invalidFileSizeMessageSummary: string =
    '{0} - سایز فایل نامعتبر است.';
  @Input() invalidFileSizeMessageDetail: string = 'حداکثر سایز فایل {0} است.';
  @Input() invalidFileTypeMessageSummary: string =
    '{0} - نوع فایل نامعتبر است.';
  @Input() invalidFileLimitMessageDetail: string =
    'حداکثر مجاز به انتخاب {0} فایل هستید.';
  @Input() invalidFileLimitMessageSummary: string =
    'مجاز به انتخاب فایل بیشتری نیستید.';
  @Input() invalidFileTypeMessageDetail: string = 'فرمت مجاز : {0}';
  @Output() onProgress = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onRemove = new EventEmitter();
  @Output() onClear = new EventEmitter();
  @Output() onError = new EventEmitter();
  @Output() onBeforeUpload = new EventEmitter();
  @Output() onUpload = new EventEmitter();
  @Output() onSend = new EventEmitter();

  selectedFiles;

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }
  _onInput() {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onInput.emit(this.value);
  }

  _onRemove(event) {
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onRemove.emit(event);
  }

  _onSelect(event) {
    this.selectedFiles = event.currentFiles;
    this.value = this.selectedFiles;
    if (this.hasValueAccessor) this.controlOnChange(this.value);
    this.onSelect.emit(event);
  }

  _onBeforeUpload(event) {
    this.onBeforeUpload.emit(event);
  }

  _onSend(event) {
    this.onSend.emit(event);
  }

  _onUpload(event) {
    this.onUpload.emit(event);
  }

  _onProgress(event) {
    this.onProgress.emit(event);
  }

  _onClear(event) {
    this.value = null;
    this.onClear.emit(event);
  }

  _onError(event) {
    this.onError.emit(event);
  }

  clear() {
    this.upload.clear();
  }
  /////////////////////////////////// DRAG DROP EXAMPLE //////////////////////////////////
  // timePeriods = [
  //   "Bronze age",
  //   "Iron age",
  //   "Middle ages",
  //   "Early modern period",
  //   "Long nineteenth century"
  // ];
  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
  // }
}
