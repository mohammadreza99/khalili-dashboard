import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNotifComponent } from './prime-notif.component';

describe('PrimeNotifComponent', () => {
  let component: PrimeNotifComponent;
  let fixture: ComponentFixture<PrimeNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimeNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
