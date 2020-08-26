import { Component, OnInit, Input } from '@angular/core';

import { PrimeProgressbarMode } from '../../prime-type/prime-progressbar-mode';

@Component({
  selector: 'prm-progress-bar',
  templateUrl: './prime-progress-bar.component.html',
  styleUrls: ['./prime-progress-bar.component.scss']
})
export class PrimeProgressBarComponent implements OnInit {

  constructor() { }

  @Input() mode: PrimeProgressbarMode = "determinate";
  @Input() height: number;
  @Input() value: number;
  @Input() showValue: boolean;

  ngOnInit() { }

}
