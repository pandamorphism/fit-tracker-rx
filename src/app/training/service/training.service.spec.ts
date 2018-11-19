import {inject, TestBed} from '@angular/core/testing';

import {TrainingService} from './training.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFirestoreStub} from '../../test-utils';

describe('TrainingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrainingService,
        {provide: AngularFirestore, useValue: AngularFirestoreStub}
      ]
    });
  });

  it('should be created', inject([TrainingService], (service: TrainingService) => {
    expect(service).toBeTruthy();
  }));
});
