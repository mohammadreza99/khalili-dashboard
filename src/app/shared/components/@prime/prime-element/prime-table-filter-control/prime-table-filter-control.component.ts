import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prm-table-filter-control',
  templateUrl: './prime-table-filter-control.component.html',
  styleUrls: ['./prime-table-filter-control.component.scss']
})
export class PrimeTableFilterControlComponent implements OnInit {

  constructor() { }

  @Input() type: string = "input";
  @Input() defaultLabel: string = "all";
  @Input() options;
  @Output() onChange = new EventEmitter<any>();


  timeout: any;
  min: number;
  max: number;
  rangeValues: number[];
  showRange: boolean = true;
  ngOnInit() {
    if (this.type == "range") {
      this.rangeValues = [this.rangeValue.min, this.rangeValue.max];
      if (this.rangeValues[1] != this.rangeValues[0])
        this.showRange = true;
      else
        this.showRange = false;
    }
  }

  get rangeValue() {
    let min = this.options[0].value;
    let max = this.options[0].value;
    for (let i = 0; i < this.options.length; i++) {
      min = Math.min(min, this.options[i].value);
      max = Math.max(max, this.options[i].value);
    }
    let val = {
      min: min,
      max: max
    };
    return val;
  }

  onValueChange(event) {

    this.onChange.emit(event);
  }

  onSliderChange(event) {
    if (this.timeout) clearTimeout(this.timeout);
    // this.rangeValues = event.values;
    event.values = this.rangeValues;
    this.timeout = setTimeout(() => {
      this.onChange.emit(event);
    }, 250);
  }
}
