import { Component, Input } from '@angular/core';

@Component({
    selector: 'statistic-card',
    templateUrl: 'statistic-card.component.html',
    styleUrls: ['statistic-card.component.scss']
})
export class StatisticCardComponent {

    @Input() title: string;
    @Input() value: number;
    @Input() icon: string;
    @Input() color: string;
}
