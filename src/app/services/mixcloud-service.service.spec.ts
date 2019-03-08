import { TestBed } from '@angular/core/testing';

import { MixcloudService } from './mixcloud.service';

describe('MixcloudServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MixcloudService = TestBed.get(MixcloudService);
    expect(service).toBeTruthy();
  });
});
