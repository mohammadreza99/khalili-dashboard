import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputTextComponent } from './prime-input-text.component';

describe('PrimeInputTextComponent', () => {
  let component: PrimeInputTextComponent;
  let fixture: ComponentFixture<PrimeInputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
