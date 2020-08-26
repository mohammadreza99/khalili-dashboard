import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputDropdownComponent } from './prime-input-dropdown.component';

describe('PrimeInputDropdownComponent', () => {
  let component: PrimeInputDropdownComponent;
  let fixture: ComponentFixture<PrimeInputDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
