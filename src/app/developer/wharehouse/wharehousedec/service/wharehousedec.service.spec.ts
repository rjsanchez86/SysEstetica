import { TestBed } from '@angular/core/testing';

import { WharehousedecService } from './wharehousedec.service';

describe('WharehousedecService', () => {
  let service: WharehousedecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WharehousedecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
