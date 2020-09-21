import { Pipe, PipeTransform } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe',
})
export class SafePipe extends BaseService implements PipeTransform {
  constructor(public domSanitizer: DomSanitizer) {
    super();
  }

  transform(value: string): Observable<SafeResourceUrl> {
    return new Observable<SafeResourceUrl>((observer) => {
      this.get<any>(value, 'blob', null).subscribe((blob) => {
        let objectURL = URL.createObjectURL(blob);
        let safeUrl: SafeResourceUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
          objectURL
        );
        observer.next(safeUrl);
      });
    });
  }
}
