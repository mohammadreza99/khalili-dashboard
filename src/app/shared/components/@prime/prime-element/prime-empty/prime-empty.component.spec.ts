import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeEmptyComponent } from './prime-empty.component';

describe('PrimeEmptyComponent', () => {
  let component: PrimeEmptyComponent;
  let fixture: ComponentFixture<PrimeEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
