import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeProgressSpinnerComponent } from './prime-progress-spinner.component';

describe('PrimeProgressSpinnerComponent', () => {
  let component: PrimeProgressSpinnerComponent;
  let fixture: ComponentFixture<PrimeProgressSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeProgressSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeProgressSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
