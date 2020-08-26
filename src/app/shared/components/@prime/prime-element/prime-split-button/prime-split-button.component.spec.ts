import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeSplitButtonComponent } from './prime-split-button.component';

describe('PrimeSplitButtonComponent', () => {
  let component: PrimeSplitButtonComponent;
  let fixture: ComponentFixture<PrimeSplitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeSplitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeSplitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
