import { TestBed } from '@angular/core/testing';

import { WharehousemovService } from './wharehousemov.service';

describe('WharehousemovService', () => {
  let service: WharehousemovService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WharehousemovService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
