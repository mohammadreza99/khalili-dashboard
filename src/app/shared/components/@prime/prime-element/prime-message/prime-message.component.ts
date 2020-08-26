import { Component, OnInit } from '@angular/core';

import { PrimeMessage } from '../../prime-model/prime-message.model';
import { PrimeMessageOptions } from '../../prime-model/prime-message-options.model';

@Component({
  selector: 'prm-message',
  templateUrl: './prime-message.component.html',
  styleUrls: ['./prime-message.component.scss'],
})
export class PrimeMessageComponent implements OnInit {
  constructor() {}

  messages: PrimeMessage[] = [];
  options = new PrimeMessageOptions();

  ngOnInit() {}

  show(message: PrimeMessage[] | PrimeMessage) {
    this.messages = [];
    if (Array.isArray(message)) {
      for (const m of message) {
        let _message = new PrimeMessage();
        Object.assign(_message, m);
        this.messages.push(_message);
      }
    } else {
      let _message = new PrimeMessage();
      Object.assign(_message, message);
      this.messages.push(_message);
    }
  }
}
