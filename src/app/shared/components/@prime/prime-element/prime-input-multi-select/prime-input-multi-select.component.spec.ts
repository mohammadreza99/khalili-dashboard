import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputMultiSelectComponent } from './prime-input-multi-select.component';

describe('PrimeInputMultiSelectComponent', () => {
  let component: PrimeInputMultiSelectComponent;
  let fixture: ComponentFixture<PrimeInputMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
