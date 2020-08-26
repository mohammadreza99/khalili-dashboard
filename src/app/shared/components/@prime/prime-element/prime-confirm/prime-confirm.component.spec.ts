import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeConfirmComponent } from './prime-confirm.component';

describe('PrimeConfirmComponent', () => {
  let component: PrimeConfirmComponent;
  let fixture: ComponentFixture<PrimeConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
