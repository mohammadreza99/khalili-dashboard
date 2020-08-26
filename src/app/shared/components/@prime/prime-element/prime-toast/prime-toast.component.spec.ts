import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeToastComponent } from './prime-toast.component';

describe('PrimeToastComponent', () => {
  let component: PrimeToastComponent;
  let fixture: ComponentFixture<PrimeToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeToastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
