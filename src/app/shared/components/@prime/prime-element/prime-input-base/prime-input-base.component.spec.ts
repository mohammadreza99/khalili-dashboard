import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputBaseComponent } from './prime-input-base.component';

describe('PrimeInputBaseComponent', () => {
  let component: PrimeInputBaseComponent;
  let fixture: ComponentFixture<PrimeInputBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
