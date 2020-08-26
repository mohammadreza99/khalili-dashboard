import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputSwitchComponent } from './prime-input-switch.component';

describe('PrimeInputSwitchComponent', () => {
  let component: PrimeInputSwitchComponent;
  let fixture: ComponentFixture<PrimeInputSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
