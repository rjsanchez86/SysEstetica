import { TestBed } from '@angular/core/testing';

import { XsegundoService } from './xsegundo.service';

describe('XsegundoService', () => {
  let service: XsegundoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XsegundoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
