import { Component, OnInit } from '@angular/core';

import { PrimeConfirmOptions } from '../../prime-model/prime-confirm-options.model';

@Component({
  selector: 'prm-confirm',
  templateUrl: './prime-confirm.component.html',
  styleUrls: ['./prime-confirm.component.scss'],
})
export class PrimeConfirmComponent implements OnInit {
  constructor() {}
  options = new PrimeConfirmOptions();
  ngOnInit() {}
}
