import { Component, OnInit, Input } from '@angular/core';

import { PrimeIconStyle, PrimeIconSize, PrimeIconRotation } from '../../prime-type/prime-icon';

@Component({
  selector: 'prm-icon',
  templateUrl: './prime-icon.component.html',
  styleUrls: ['./prime-icon.component.scss']
})
export class PrimeIconComponent implements OnInit {

  constructor() { }


  @Input() icon: string = null;
  @Input() color: string = "#000000";
  @Input() stylePrefix: PrimeIconStyle = "fas";
  @Input() fixedWidth: boolean = false;
  @Input() size: PrimeIconSize = "1x";
  @Input() rotation: PrimeIconRotation = null;
  @Input() spin: boolean = false;
  @Input() border: boolean = false;

  styleClass = "";

  ngOnInit(): void {
    this.styleClass += `${this.icon} `;
    this.styleClass += `${this.stylePrefix} `;
    this.styleClass += `fa-${this.size} `;
    if (this.fixedWidth) this.styleClass += " fa-fw ";
    if (this.rotation) this.styleClass += ` fa-${this.rotation} `;
    if (this.spin) this.styleClass += " fa-spin";
    if (this.border) this.styleClass += " fa-border";
  }

}
