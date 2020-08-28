import {
  Component,
  OnInit,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { IDatePickerConfig, DatePickerComponent } from 'ng2-jalali-date-picker';
import * as moment from 'jalali-moment';

import { PrimeDatePickerMode } from '../../prime-type/prime-date-picker';
import { PrimeDirection } from '../../prime-type/prime-direction';

@Component({
  selector: 'prm-date-time-picker',
  templateUrl: './prime-date-time-picker.component.html',
  styleUrls: ['./prime-date-time-picker.component.scss'],
})
export class PrimeDateTimePickerComponent implements OnInit {
  constructor(public el: ElementRef) {}
  @Input() datePickerMode: PrimeDatePickerMode = 'day';
  @Input() inline: boolean = false;
  @Input() disabled: boolean = false;
  @Input() clearable: boolean = true;
  @Input() placeholder: string;
  @Input() readonly: boolean = false;
  @Input() layout: PrimeDirection = 'rtl';
  @Input() style: object = null;
  @Input() minDate: moment.Moment | string = undefined;
  @Input() maxDate: moment.Moment | string = undefined;
  @Input() minTime: moment.Moment | string = undefined;
  @Input() maxTime: moment.Moment | string = undefined;
  @Input() date: moment.Moment = moment();
  @Output() dateChange = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onGoToCurrent = new EventEmitter();
  @Output() onLeftNav = new EventEmitter();
  @Output() onRightNav = new EventEmitter();
  @Output() onBlur = new EventEmitter();
  @Output() onFocus = new EventEmitter();

  _date: moment.Moment;
  config: IDatePickerConfig = {
    disableKeypress: true,
    closeOnSelect: true,
    openOnClick: true,
    openOnFocus: true,
    allowMultiSelect: false,
    showTwentyFourHours: true,
    showGoToCurrent: true,
    hideOnOutsideClick: true,
    locale: moment.locale('fa'),
  };

  _miladiMonths = [
    'ژانویه ',
    'فوریه ',
    'مارس',
    'آوریل',
    'می',
    'ژوئن',
    'جولای',
    'آگوست',
    'سپتامبر',
    'اکتبر',
    'نوامبر',
    'دسامبر',
  ];
  _months = [
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ];
  _weeks: string[] = [
    'شنبه',
    'یکشنبه',
    'دوشنبه',
    'سه شنبه',
    'چهارشنبه',
    'پنج شنبه',
    'جمعه',
  ];

  ngOnInit(): void {
    if (this.readonly) {
      this.config.openOnClick = false;
      this.config.openOnFocus = false;
    }

    setTimeout(() => {
      if (this.date) this._date = this.date;
    }, 0);
  }

  getStrWeekDay(momentObj: moment.Moment): string {
    let strWeekDay: string;
    if (momentObj.toDate().getDay() == 6) strWeekDay = this._weeks[0];
    else strWeekDay = this._weeks[momentObj.toDate().getDay() + 1];
    return strWeekDay;
  }

  clearInput() {
    this._date = undefined;
    this.onChange.emit(undefined);
  }

  _onChange(date) {
    if (date) {
      let result;
      let dateObj = date._d;
      switch (this.datePickerMode) {
        case 'day': {
          result = {
            day: date.date(),
            month: date.month() + 1,
            year: date.year(),
            strWeekDay: this.getStrWeekDay(date),
            strMonth: this._months[date.month()],
            miladiDay: dateObj.getDate(),
            miladiMonth: dateObj.getMonth() + 1,
            miladiYear: dateObj.getFullYear(),
            miladiStrMonth: this._miladiMonths[dateObj.getMonth()],
            dateObj: dateObj,
            momentObj: date,
          };
          break;
        }
        case 'month': {
          result = {
            month: date.month() + 1,
            year: date.year(),
            momentObj: date,
          };
          break;
        }
        case 'daytime': {
          result = {
            hour: date.hours(),
            minute: date.minutes(),
            year: date.year(),
            month: date.month() + 1,
            day: date.date(),
            strWeekDay: this.getStrWeekDay(date),
            strMonth: this._months[date.month()],
            miladiDay: dateObj.getDate(),
            miladiMonth: dateObj.getMonth() + 1,
            miladiStrMonth: this._miladiMonths[dateObj.getMonth()],
            miladiYear: dateObj.getFullYear(),
            dateObj: dateObj,
            momentObj: date,
          };
          break;
        }
        case 'time': {
          result = {
            hour: date.hours(),
            minute: date.minutes(),
            momentObj: date,
          };
          break;
        }
      }
      this.dateChange.emit(result);
      this.onChange.emit(result);
    }
  }

  _onInlineChange(event) {
    this.onChange.emit(event)
  }

  _onOpen() {
    this.onOpen.emit();
  }

  _onClose() {
    this.onClose.emit();
  }

  _onGoToCurrent() {
    this.onGoToCurrent.emit();
  }

  _onLeftNav() {
    this.onLeftNav.emit();
  }

  _onRightNav() {
    this.onRightNav.emit();
  }

  _onFocus() {
    this.onFocus.emit();
  }

  _onBlur() {
    this.onBlur.emit();
  }
}
