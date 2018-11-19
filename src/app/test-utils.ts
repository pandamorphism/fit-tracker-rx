import {EMPTY} from 'rxjs';

export const AngularFirestoreStub = {
  // I just mocked the function you need, if there are more, you can add them here.
  collection: (someString) => ({
    // return mocked collection here
    valueChanges: () => EMPTY,
  })
};
