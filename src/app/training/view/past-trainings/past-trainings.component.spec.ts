import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PastTrainingsComponent} from './past-trainings.component';
import {MaterialModule} from '../../../material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreStub} from '../../../test-utils';

describe('PastTrainingsComponent', () => {
  let component: PastTrainingsComponent;
  let fixture: ComponentFixture<PastTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MaterialModule],
      providers: [{
        provide: AngularFirestore, useValue: AngularFirestoreStub
      }],
      declarations: [PastTrainingsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
