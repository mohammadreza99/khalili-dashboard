import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputAutocompleteComponent } from './prime-input-autocomplete.component';

describe('PrimeInputAutocompleteComponent', () => {
  let component: PrimeInputAutocompleteComponent;
  let fixture: ComponentFixture<PrimeInputAutocompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputAutocompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
