import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputDateTimePickerComponent } from './prime-input-date-time-picker.component';

describe('PrimeInputDateTimePickerComponent', () => {
  let component: PrimeInputDateTimePickerComponent;
  let fixture: ComponentFixture<PrimeInputDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
