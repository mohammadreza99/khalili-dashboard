import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

import {
  PrimeTreeFilterMode,
  PrimeTreeSelectionMode,
} from '../../prime-type/prime-tree';
import { PrimeTree } from '../../prime-model/prime-tree.model';
import { PrimeOrientation } from '../../prime-type/prime-orientation';
import { PrimeInputBaseComponent } from '../prime-input-base/prime-input-base.component';

@Component({
  selector: 'prm-tree',
  templateUrl: './prime-tree.component.html',
  styleUrls: ['./prime-tree.component.scss'],
})
export class PrimeTreeComponent extends PrimeInputBaseComponent
  implements OnInit, AfterViewInit {
  @Input() items: PrimeTree[];
  @Input() hasFilter: boolean = true;
  @Input() metaKeySelection: boolean = true;
  @Input() filterPlaceholder: string = 'جستجو';
  @Input() filterMode: PrimeTreeFilterMode = 'lenient';
  @Input() emptyMessage: string = 'موردی یافت نشد';
  @Input() propagateSelectionUp: boolean = true;
  @Input() propagateSelectionDown: boolean = true;
  @Input() selectionMode: PrimeTreeSelectionMode = 'single';
  @Input() selected: PrimeTree | PrimeTree[] = null;
  @Input() orientation: PrimeOrientation = 'horizontal';
  @Output() onNodeSelect = new EventEmitter();
  @Output() onNodeUnselect = new EventEmitter();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @Output() selectedChange = new EventEmitter();

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  _onNodeSelect(event) {
    let result: any;
    if (this.selectionMode == 'checkbox' || this.selectionMode == 'multiple') {
      result = {
        selectedNode: event.node,
        selectedNodes: this.selected,
      };
    } else {
      result = event.node;
    }
    if (this.controlContainer) this.controlOnChange(this.value);
    this.onNodeSelect.emit(result);
    this.selectedChange.emit(this.selected);
  }

  _onNodeUnselect(event) {
    if (this.controlContainer) this.controlOnChange(this.value);
    this.onNodeUnselect.emit(event.node);
    this.selectedChange.emit(this.selected);
  }

  _onNodeExpand(event) {
    this.onNodeExpand.emit(event.node);
  }

  _onNodeCollapse(event) {
    this.onNodeCollapse.emit(event.node);
  }
}
