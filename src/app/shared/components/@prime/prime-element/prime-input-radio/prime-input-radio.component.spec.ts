import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputRadioComponent } from './prime-input-radio.component';

describe('PrimeInputRadioComponent', () => {
  let component: PrimeInputRadioComponent;
  let fixture: ComponentFixture<PrimeInputRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
