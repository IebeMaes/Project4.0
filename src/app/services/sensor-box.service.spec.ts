import { TestBed } from '@angular/core/testing';

import { SensorBoxService } from './sensor-box.service';

describe('SensorBoxService', () => {
  let service: SensorBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
