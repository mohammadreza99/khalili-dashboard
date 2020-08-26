import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputCheckboxGroupComponent } from './prime-input-checkbox-group.component';

describe('PrimeInputCheckboxGroupComponent', () => {
  let component: PrimeInputCheckboxGroupComponent;
  let fixture: ComponentFixture<PrimeInputCheckboxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrimeInputCheckboxGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
