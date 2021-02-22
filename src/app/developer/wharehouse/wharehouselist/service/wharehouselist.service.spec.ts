import { TestBed } from '@angular/core/testing';

import { WharehouselistService } from './wharehouselist.service';

describe('WharehouselistService', () => {
  let service: WharehouselistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WharehouselistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
