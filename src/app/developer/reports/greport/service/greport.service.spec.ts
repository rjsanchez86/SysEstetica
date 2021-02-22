import { TestBed } from '@angular/core/testing';

import { GreportService } from './greport.service';

describe('GreportService', () => {
  let service: GreportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GreportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
