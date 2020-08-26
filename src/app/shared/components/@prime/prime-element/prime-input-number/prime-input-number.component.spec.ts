import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputNumberComponent } from './prime-input-number.component';

describe('PrimeInputNumberComponent', () => {
  let component: PrimeInputNumberComponent;
  let fixture: ComponentFixture<PrimeInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
