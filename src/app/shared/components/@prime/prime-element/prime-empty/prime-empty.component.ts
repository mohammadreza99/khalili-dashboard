import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'prm-empty',
  templateUrl: './prime-empty.component.html',
  styleUrls: ['./prime-empty.component.scss']
})
export class PrimeEmptyComponent implements OnInit {

  constructor() { }
  
  @Input() show: boolean = false;
  @Input() message: string = "موردی وجود ندارد.";

  ngOnInit() { }
}
