import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { PrimeBeforeAfterConfig } from '../prime-type/prime-before-after-config';

@Directive({
  selector: '[beforeAfter]',
})
export class BeforeAfterDirective implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  @Input() beforeAfter: {
    before?: PrimeBeforeAfterConfig;
    after?: PrimeBeforeAfterConfig;
  };
  @Output() onBeforeBtnClick = new EventEmitter();
  @Output() onAfterBtnClick = new EventEmitter();

  ngOnInit(): void {
    if (this.beforeAfter)
      for (const side in this.beforeAfter) {
        const object = this.beforeAfter[side] as PrimeBeforeAfterConfig;
        switch (object.type) {
          case 'button':
            const BTN = this.renderer.createElement('button');
            const BTN_ICON_SPAN = this.renderer.createElement('span');
            const BTN_TEXT_SPAN = this.renderer.createElement('span');
            const BTN_TEXT = this.renderer.createText(object.label);
            const _btnColor = object.color;
            const _btnIcon = object.icon || null;
            const _btnLabel = object.label || null;
            const _btnIconPos = object.iconPos || 'left';
            const _btnIconSpin = object.iconSpin || false;
            const _btnIconStylePrefix = object.iconStylePrefix || 'fas';
            const _btnIconRotation = object.iconRotation;
            this.renderer.setAttribute(BTN, 'type', 'button');
            this.renderer.addClass(BTN, 'ui-button');
            this.renderer.addClass(BTN, 'ui-widget');
            this.renderer.addClass(BTN, 'ui-state-default');
            this.renderer.addClass(BTN, 'ui-corner-all');
            this.renderer.addClass(BTN_TEXT_SPAN, 'ui-button-text');
            this.renderer.addClass(BTN_TEXT_SPAN, 'ui-clickable');
            this.renderer.appendChild(BTN_TEXT_SPAN, BTN_TEXT || 'ui-btn');
            this.renderer.appendChild(BTN, BTN_TEXT_SPAN);
            switch (_btnColor) {
              case 'lightGray':
                this.renderer.addClass(BTN, 'ui-button-secondary');
                break;
              default:
                this.renderer.addClass(BTN, `ui-button-${_btnColor}`);
                this.renderer.addClass(BTN, `bg-${_btnColor}`);
                this.renderer.addClass(BTN, `border-${_btnColor}`);
                break;
            }
            if (_btnIcon != null) {
              if (_btnIconSpin)
                this.renderer.addClass(BTN_ICON_SPAN, 'fa-spin');
              this.renderer.addClass(BTN_ICON_SPAN, `${_btnIconStylePrefix}`);
              this.renderer.addClass(BTN_ICON_SPAN, `fa-${_btnIconRotation}`);
              this.renderer.addClass(BTN_ICON_SPAN, `fa-${_btnIcon}`);
              this.renderer.addClass(BTN_ICON_SPAN, 'ui-clickable');
              this.renderer.setAttribute(BTN_ICON_SPAN, 'aria-hidden', 'true');
              this.renderer.appendChild(BTN, BTN_ICON_SPAN);
              if (_btnLabel != null) {
                // has icon & text
                this.renderer.addClass(
                  BTN,
                  `ui-button-text-icon-${_btnIconPos}`
                );
                this.renderer.addClass(
                  BTN_ICON_SPAN,
                  `ui-button-icon-${_btnIconPos}`
                );
              } else {
                // has icon only
                this.renderer.addClass(BTN, 'ui-button-icon-only');
                this.renderer.addClass(BTN_ICON_SPAN, 'ui-button-icon-left');
              }
            } else if (_btnIcon == null) {
              //has text only
              this.renderer.addClass(BTN, 'ui-button-text-only');
            }
            this.addToDOM(BTN, side);
            this.renderer.listen(BTN, 'click', (evt) => {
              if (side == 'after') this.onAfterBtnClick.emit(evt);
              else this.onBeforeBtnClick.emit(evt);
            });
            break;
          case 'icon':
            const ICON = this.renderer.createElement('i');
            const ICON_SPAN = this.renderer.createElement('span');
            const _icon = object.icon;
            const _spin = object.spin || false;
            const _stylePrefix = object.stylePrefix || 'fas';
            const _rotation = object.rotation;
            this.renderer.addClass(ICON, `${_stylePrefix}`);
            this.renderer.addClass(ICON, `fa-${_icon}`);
            this.renderer.addClass(ICON, `fa-${_rotation}`);
            this.renderer.setStyle(ICON, 'line-height', 1.25);
            this.renderer.addClass(ICON_SPAN, 'ui-inputgroup-addon');
            this.renderer.addClass(ICON_SPAN, 'p-1');
            this.renderer.setStyle(ICON_SPAN, 'z-index', 1000);
            if (_spin) this.renderer.addClass(ICON, 'fa-spin');
            this.renderer.appendChild(ICON_SPAN, ICON);
            this.addToDOM(ICON_SPAN, side);
            break;
          case 'text':
            const TEXT = this.renderer.createText(object.text || null);
            const TEXT_SPAN = this.renderer.createElement('span');
            this.renderer.addClass(TEXT_SPAN, 'ui-inputgroup-addon');
            this.renderer.addClass(TEXT_SPAN, 'p-1');
            this.renderer.setStyle(TEXT_SPAN, 'z-index', 1000);
            this.renderer.setStyle(TEXT_SPAN, 'line-height', 1.25);
            this.renderer.setStyle(TEXT_SPAN, 'font-size', '14px');
            this.renderer.setStyle(TEXT_SPAN, 'display', 'flex');
            this.renderer.setStyle(TEXT_SPAN, 'align-items', 'center');
            this.renderer.setStyle(TEXT_SPAN, 'justify-content', 'center');
            this.renderer.appendChild(TEXT_SPAN, TEXT);
            this.addToDOM(TEXT_SPAN, side);
            break;
        }
      }
  }

  addToDOM(el: any, pos: string) {
    if (pos == 'after')
      this.renderer.insertBefore(
        this.el.nativeElement.parentNode,
        el,
        this.el.nativeElement
      );
    else if (pos == 'before')
      this.renderer.appendChild(this.el.nativeElement.parentNode, el);
  }
}
