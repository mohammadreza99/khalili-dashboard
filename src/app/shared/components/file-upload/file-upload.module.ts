import { NgModule } from '@angular/core';
import { NgxUploaderModule } from 'ngx-uploader';
import { FileUploadComponent } from './file-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/share.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [
        FileUploadComponent,
    ],
    imports: [
        NgxUploaderModule,
        CommonModule,
        OrganizationChartModule,
        CalendarModule,
        TableModule,
        ConfirmDialogModule,
        DataViewModule,
        ToolbarModule,
        PanelModule,

    ],
    exports: [FileUploadComponent],
})
export class FilesUploadModule { }
