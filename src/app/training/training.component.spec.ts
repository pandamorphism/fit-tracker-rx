import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TrainingComponent} from './training.component';
import {TrainingModule} from './training.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreStub} from '../test-utils';

describe('TrainingComponent', () => {
  let component: TrainingComponent;
  let fixture: ComponentFixture<TrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TrainingModule],
      providers: [{provide: AngularFirestore, useValue: AngularFirestoreStub}],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
