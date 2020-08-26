import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputTextareaComponent } from './prime-input-textarea.component';

describe('PrimeInputTextareaComponent', () => {
  let component: PrimeInputTextareaComponent;
  let fixture: ComponentFixture<PrimeInputTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
