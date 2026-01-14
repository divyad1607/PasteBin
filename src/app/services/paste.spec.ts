import { TestBed } from '@angular/core/testing';

import { PasteService } from './PasteService';

describe('Paste', () => {
  let service: PasteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
