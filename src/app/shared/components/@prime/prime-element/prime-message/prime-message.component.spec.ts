import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeMessageComponent } from './prime-message.component';

describe('PrimeMessageComponent', () => {
  let component: PrimeMessageComponent;
  let fixture: ComponentFixture<PrimeMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
