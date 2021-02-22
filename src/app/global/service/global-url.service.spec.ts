import { TestBed } from '@angular/core/testing';

import { GlobalUrlService } from './global-url.service';

describe('GlobalUrlService', () => {
  let service: GlobalUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
