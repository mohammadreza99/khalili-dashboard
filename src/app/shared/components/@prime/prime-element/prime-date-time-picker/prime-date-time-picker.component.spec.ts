import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeDateTimePickerComponent } from './prime-date-time-picker.component';

describe('PrimeDateTimePickerComponent', () => {
  let component: PrimeDateTimePickerComponent;
  let fixture: ComponentFixture<PrimeDateTimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeDateTimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeDateTimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
