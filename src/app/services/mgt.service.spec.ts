import { TestBed } from '@angular/core/testing';

import { MgtService } from './mgt.service';

describe('MgtService', () => {
  let service: MgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
