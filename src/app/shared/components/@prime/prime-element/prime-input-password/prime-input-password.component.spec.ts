import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputPasswordComponent } from './prime-input-password.component';

describe('PrimeInputPasswordComponent', () => {
  let component: PrimeInputPasswordComponent;
  let fixture: ComponentFixture<PrimeInputPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
