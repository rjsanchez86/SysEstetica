import { TestBed } from '@angular/core/testing';

import { NavRightService } from './nav-right.service';

describe('NavRightService', () => {
  let service: NavRightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavRightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
