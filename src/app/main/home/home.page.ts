import {
  Component,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'ag-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  @ViewChild('mainContent', { static: true }) mainContent: ElementRef;
  @ViewChild('sidebar', { static: true, read: ElementRef }) sidebar: ElementRef;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resize(event);
  }

  showSidebar = true;
  isModalSidebar = false;

  constructor(private cd: ChangeDetectorRef) {}

  onHambergurClick() {
    this.showSidebar = !this.showSidebar;
    if (!this.isModalSidebar) {
      this.mainContent.nativeElement.classList.toggle('mr-278');
    }
  }

  resize(event) {
    if (event.target.innerWidth < 768) {
      this.isModalSidebar = true;
      this.mainContent.nativeElement.classList.remove('mr-278');
    } else {
      this.isModalSidebar = false;
      if (this.showSidebar) {
        this.mainContent.nativeElement.classList.add('mr-278');
      }
      const sidebarMask = document.querySelector('.ui-sidebar-mask');
      if (sidebarMask) {
        sidebarMask.setAttribute('style', 'display:none');
      }
    }
    this.cd.detectChanges();
  }
}
