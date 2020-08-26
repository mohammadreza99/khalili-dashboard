import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputCheckboxSingleComponent } from './prime-input-checkbox-single.component';

describe('PrimeInputCheckboxSingleComponent', () => {
  let component: PrimeInputCheckboxSingleComponent;
  let fixture: ComponentFixture<PrimeInputCheckboxSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputCheckboxSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputCheckboxSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
