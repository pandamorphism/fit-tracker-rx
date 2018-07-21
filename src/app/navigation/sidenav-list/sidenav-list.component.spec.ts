import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavListComponent} from './sidenav-list.component';
import {MaterialModule} from '../../material/material.module';
import {AuthService} from '../../auth/service/auth.service';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

describe('SidenavListComponent', () => {
  let component: SidenavListComponent;
  let fixture: ComponentFixture<SidenavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, RouterModule.forRoot([])],
      providers: [AuthService, {provide: APP_BASE_HREF, useValue: '/'}],
      declarations: [SidenavListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
