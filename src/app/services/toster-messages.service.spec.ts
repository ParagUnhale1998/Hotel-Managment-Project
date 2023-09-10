import { TestBed } from '@angular/core/testing';

import { TosterMessagesService } from './toster-messages.service';

describe('TosterMessagesService', () => {
  let service: TosterMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TosterMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
