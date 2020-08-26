import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputFileComponent } from './prime-input-file.component';

describe('PrimeInputFileComponent', () => {
  let component: PrimeInputFileComponent;
  let fixture: ComponentFixture<PrimeInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
