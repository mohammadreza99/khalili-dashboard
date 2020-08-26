import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputMaskComponent } from './prime-input-mask.component';

describe('PrimeInputMaskComponent', () => {
  let component: PrimeInputMaskComponent;
  let fixture: ComponentFixture<PrimeInputMaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
