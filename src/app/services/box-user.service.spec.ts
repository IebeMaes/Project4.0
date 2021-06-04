import { TestBed } from '@angular/core/testing';

import { BoxUserService } from './box-user.service';

describe('BoxUserService', () => {
  let service: BoxUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoxUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
