import { TestBed } from '@angular/core/testing';

import { Others } from './others';

describe('Others', () => {
  let service: Others;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Others);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
