import { TestBed } from '@angular/core/testing';

import { InventorymService } from './inventorym.service';

describe('InventorymService', () => {
  let service: InventorymService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventorymService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
