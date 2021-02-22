import { TestBed } from '@angular/core/testing';

import { WharehouseService } from './wharehouse.service';

describe('WharehouseService', () => {
  let service: WharehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WharehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
