import { TestBed } from '@angular/core/testing';

import { PrimeConfirmService } from './prime-confirm.service';

describe('PrimeConfirmService', () => {
  let service: PrimeConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeConfirmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
