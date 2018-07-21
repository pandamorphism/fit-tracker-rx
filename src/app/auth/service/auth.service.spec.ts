import {inject, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [AuthService, {provide: APP_BASE_HREF, useValue: '/'}]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
