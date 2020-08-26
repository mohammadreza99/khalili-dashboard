import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prm-progress-spinner',
  templateUrl: './prime-progress-spinner.component.html',
  styleUrls: ['./prime-progress-spinner.component.scss']
})
export class PrimeProgressSpinnerComponent implements OnInit {

  constructor() { }

  @Input() fill: string;
  @Input() animationDuration: number = 2;
  @Input() strokeWidth: number = 2;
  @Input() width: number = 100;
  @Input() height: number = 100;

  style: object;

  ngOnInit() {
    this.style = {
      width: this.width + "px",
      height: this.height + "px"
    };
  }
}
