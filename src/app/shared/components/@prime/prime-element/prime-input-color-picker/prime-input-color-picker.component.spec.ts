import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputColorPickerComponent } from './prime-input-color-picker.component';

describe('PrimeInputColorPickerComponent', () => {
  let component: PrimeInputColorPickerComponent;
  let fixture: ComponentFixture<PrimeInputColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
