import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

import { PrimePosition } from '../../prime-type/prime-position';
import { PrimeColor } from '../../prime-type/prime-color';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-split-button',
  templateUrl: './prime-split-button.component.html',
  styleUrls: ['./prime-split-button.component.scss']
})
export class PrimeSplitButtonComponent implements OnInit {
  constructor() { }

  @Input() label: string;
  @Input() icon: string;
  @Input() iconPos: PrimePosition = "right";
  @Input() style: object = null;
  @Input() menuStyle: object = null;
  @Input() dir: PrimeDirection = "ltr";
  @Input() disabled: boolean = false;
  @Input() color: PrimeColor;
  @Input() items: MenuItem[];
  @Output() onClick = new EventEmitter();
  @Output() onDropdownClick = new EventEmitter();

  styleClass: string = "";
  _onClick() {
    this.onClick.emit();
  }

  _onDropdownClick() {
    this.onDropdownClick.emit();
  }

  ngOnInit() {
    switch (this.color) {
      case "lightGray":
        this.styleClass += " ui-button-secondary";
        break;
      default:
        this.styleClass += `ui-button-${this.color} bg-${this.color} border-${this.color}`;
        break;
    }
  }
}
