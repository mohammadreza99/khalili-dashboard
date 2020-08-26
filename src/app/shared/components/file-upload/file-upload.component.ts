import { Component, EventEmitter, Input, Output, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UploaderOptions, UploadFile, UploadInput, humanizeBytes, UploadOutput, UploadStatus } from 'ngx-uploader';

export class UploadFiles {
  id: number;
  documentId: number;
  uniqId: any;
  media: any;
  fileName: string;
  fileType: number;
  isActive: boolean;
  userId: number;
  insertDate: Date;
}

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {
  @ViewChild('uploader') uploadElRef: ElementRef;

  _options: any[];
  attachmentTypes: any[];
  uploadData: UploadFiles[];

  fileType: number;
  formData: FormData;
  humanizeBytes: Function;

  dragOver: boolean;
  optionsChanged: boolean;

  @Input() options: any[];
  @Input() type: string;
  @Input() id: number;
  @Input() dargOver: boolean;
  optionsUp: UploaderOptions;
  @Input() files: UploadFile[];
  @Input() showClear: boolean;
  @Output() uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
  @Output() uploadOutput: EventEmitter<UploadOutput> = new EventEmitter<UploadOutput>();
  // @Output() onChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.optionsUp = { concurrency: 10 };
    this.files = [];
    this.uploadInput = new EventEmitter<UploadInput>();
    this.humanizeBytes = humanizeBytes;
  }

  ngOnInit() {
    this.attachmentTypes = [];
  }

  onChangeUploadFileType($event) {
    this.fileType = $event.value;
  }

  onUploadOutput(output: UploadOutput) {
    this.uploadElRef.nativeElement.value = '';
    if (this.type === 'document') {
      let uploadData: UploadFiles = {
        documentId: Number(this.id),
        fileName: '',
        fileType: this.fileType,
        id: 0,
        media: null,
        isActive: true,
        userId: 0,
        insertDate: null,
        uniqId: null,
      };

      if (output.type === 'allAddedToQueue') {
      } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
        this.files.push(output.file);
      } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
        const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
        this.files[index] = output.file;
      } else if (output.type === 'removed') {
        this.files = this.files.filter((file: UploadFile) => file !== output.file);
      } else if (output.type === 'dragOver') {
        this.dragOver = true;
      } else if (output.type === 'dragOut') {
        this.dragOver = false;
      } else if (output.type === 'drop') {
        this.dragOver = false;
      } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
        console.log(output.file.name + ' rejected');
      }
      this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);
    }

  }

  startUpload(): void {

    let uploadData: UploadFiles = {

      documentId: Number(this.id),
      fileName: '',
      fileType: this.fileType,
      id: 0,
      media: null,
      isActive: true,
      userId: 0,
      insertDate: null,
      uniqId: null,
    };

    // let f = new FormData();
    // this.files.forEach(file => {
    //   f.append('file', file.nativeFile, file.name);
    // });
    // f.append('model', JSON.stringify(uploadData));

    const event: UploadInput = {
      type: 'uploadAll',
      url: 'https://managment-api.ttarya.ir/AttachmentInsert',
      method: 'POST',
      headers: { 'Authorization': localStorage.getItem('token') },
      data: { model: JSON.stringify(uploadData) }
    };

    this.uploadInput.emit(event);

    // return;


    // if (this.type === 'document') {


    //   // this.post('Entry/AttachmentInsert', f, 'blob').subscribe(x => {
    //   //   this.files = [];
    //   // });
    //   this.enservice.addAttachment(f).subscribe(x => {
    //     this.files = [];
    //   });
    // }
  }

  delete(args) {
    this.files = this.files.filter(x => x != args);
  }
}
