import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeTableFilterControlComponent } from './prime-table-filter-control.component';

describe('PrimeTableFilterControlComponent', () => {
  let component: PrimeTableFilterControlComponent;
  let fixture: ComponentFixture<PrimeTableFilterControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeTableFilterControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeTableFilterControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
