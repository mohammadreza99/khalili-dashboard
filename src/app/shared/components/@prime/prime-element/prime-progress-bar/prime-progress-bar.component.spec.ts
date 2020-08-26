import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeProgressBarComponent } from './prime-progress-bar.component';

describe('PrimeProgressBarComponent', () => {
  let component: PrimeProgressBarComponent;
  let fixture: ComponentFixture<PrimeProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
