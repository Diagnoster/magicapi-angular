import { TestBed } from '@angular/core/testing';

import { MtgService } from './mtg.service';

describe('MtgService', () => {
  let service: MtgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
