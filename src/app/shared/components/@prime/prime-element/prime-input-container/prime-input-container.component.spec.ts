import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputContainerComponent } from './prime-input-container.component';

describe('PrimeInputContainerComponent', () => {
  let component: PrimeInputContainerComponent;
  let fixture: ComponentFixture<PrimeInputContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
