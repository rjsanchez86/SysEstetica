import { TestBed } from '@angular/core/testing';

import { ListsalesService } from './listsales.service';

describe('ListsalesService', () => {
  let service: ListsalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListsalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
