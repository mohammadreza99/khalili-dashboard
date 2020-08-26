import { TestBed } from '@angular/core/testing';

import { PrimeMessageService } from './prime-message.service';

describe('PrimeMessageService', () => {
  let service: PrimeMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
