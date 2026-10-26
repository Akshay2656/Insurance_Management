import { TestBed } from '@angular/core/testing';
import { PolicyApi } from './policy-api';

describe('PolicyApi', () => {
  let service: PolicyApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
