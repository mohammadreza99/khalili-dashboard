import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PrimeToastOptions } from '../../prime-model/prime-toast-options.model';

@Component({
  selector: 'prm-toast',
  templateUrl: './prime-toast.component.html',
  styleUrls: ['./prime-toast.component.scss'],
})
export class PrimeToastComponent implements OnInit {
  constructor() {}

  options = new PrimeToastOptions();
  
  ngOnInit() {}
}
