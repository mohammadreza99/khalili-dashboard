import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputSliderComponent } from './prime-input-slider.component';

describe('PrimeInputSliderComponent', () => {
  let component: PrimeInputSliderComponent;
  let fixture: ComponentFixture<PrimeInputSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
