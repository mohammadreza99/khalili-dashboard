import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellDatepickerComponent } from './cell-datepicker.component';

describe('CellDatepickerComponent', () => {
  let component: CellDatepickerComponent;
  let fixture: ComponentFixture<CellDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
