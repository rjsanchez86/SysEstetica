import { TestBed } from '@angular/core/testing';

import { RproductsService } from './rproducts.service';

describe('RproductsService', () => {
  let service: RproductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RproductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
