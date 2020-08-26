import { TestBed } from '@angular/core/testing';

import { PrimeToastService } from './prime-toast.service';

describe('PrimeToastService', () => {
  let service: PrimeToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimeToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
