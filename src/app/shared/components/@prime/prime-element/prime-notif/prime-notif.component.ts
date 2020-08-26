import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prm-notif',
  templateUrl: './prime-notif.component.html',
  styleUrls: ['./prime-notif.component.scss']
})
export class PrimeNotifComponent implements OnInit {

  constructor() { }
  @Input() enableNotif: boolean;
  @Input() routerLink: string;
  @Input() icon: string;

  ngOnInit() { }
}
