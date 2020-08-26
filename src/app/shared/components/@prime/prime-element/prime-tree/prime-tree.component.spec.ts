import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeTreeComponent } from './prime-tree.component';

describe('PrimeTreeComponent', () => {
  let component: PrimeTreeComponent;
  let fixture: ComponentFixture<PrimeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
