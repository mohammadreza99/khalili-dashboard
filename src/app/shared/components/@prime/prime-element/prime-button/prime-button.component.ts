import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { PrimeColor } from '../../prime-type/prime-color';
import { PrimePosition } from '../../prime-type/prime-position';

@Component({
  selector: 'prm-button',
  templateUrl: './prime-button.component.html',
  styleUrls: ['./prime-button.component.scss'],
})
export class PrimeButtonComponent implements OnInit {
  constructor() {}
  @Input() icon: string;
  @Input() iconPos: PrimePosition = 'right';
  @Input() label: string;
  @Input() type: string = 'button';
  @Input() style: object;
  @Input() rounded: boolean;
  @Input() disabled: boolean;
  @Input() raised: boolean;
  @Input() color: PrimeColor;
  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onClick = new EventEmitter();

  styleClass: string = '';

  _onBlur() {
    this.onBlur.emit();
  }

  _onFocus() {
    this.onFocus.emit();
  }

  _onClick() {
    this.onClick.emit();
  }

  ngOnInit() {
    if (this.rounded) this.styleClass += ' ui-button-rounded';
    if (this.raised) this.styleClass += ' ui-button-raised';
    switch (this.color) {
      case 'lightGray':
        this.styleClass += ' ui-button-secondary';
        break;
      default:
        this.styleClass += `ui-button-${this.color} bg-${this.color} border-${this.color}`;
        break;
    }
  }
}
