import { TestBed } from '@angular/core/testing';

import { PordersService } from './porders.service';

describe('PordersService', () => {
  let service: PordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
