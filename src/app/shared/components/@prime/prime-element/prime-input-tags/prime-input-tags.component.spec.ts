import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeInputTagsComponent } from './prime-input-tags.component';

describe('PrimeInputTagsComponent', () => {
  let component: PrimeInputTagsComponent;
  let fixture: ComponentFixture<PrimeInputTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeInputTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeInputTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
