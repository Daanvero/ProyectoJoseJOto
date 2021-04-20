import { TestBed } from '@angular/core/testing';

import { FirebaseSerService } from './firebase-ser.service';

describe('FirebaseSerService', () => {
  let service: FirebaseSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
