import {Injectable} from '@angular/core';
import {Exercise} from '../model/exercise';
import {Observable, of, Subject} from 'rxjs';
import {tag} from 'rxjs-spy/operators';
import {scan, shareReplay, tap, withLatestFrom} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8, kind: 'exercise'},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15, kind: 'exercise'},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18, kind: 'exercise'},
    {id: 'burpees', name: 'Burepees', duration: 60, calories: 8, kind: 'exercise'},
  ];
  private runningExercise: Subject<Exercise> = new Subject();
  private completedExercises: Subject<Exercise> = new Subject();
  private cancelledExercises: Subject<Exercise> = new Subject();
  completedExercises$ = this.completedExercises.asObservable().pipe(
    scan((acc, current) => [...acc, current], []),
    tag('completedEx')
  )
    .subscribe();
  cancelledExercises$ = this.cancelledExercises.asObservable().pipe(
    scan((acc, current) => [...acc, current], []),
    tag('cancelledEx')
  )
    .subscribe();

  runningExercise$: Observable<Exercise> = this.runningExercise.asObservable().pipe(
    tag('runningExercise'),
    shareReplay(1)
  );

  exerciseResult$: Subject<'completed' | 'cancelled'> = new Subject();

  constructor() {
    this.exerciseResult$.pipe(
      withLatestFrom(this.runningExercise),
      tap(([result, exercise]) => {
        switch (result) {
          case 'completed' :
            this.completedExercises.next(exercise);
            break;
          case 'cancelled' :
            this.cancelledExercises.next(exercise);
            break;
        }
      }),
      tap(() => this.runningExercise.next(null))
    ).subscribe();
  }

  startExercise(exId: string) {
    this.runningExercise.next(this._availableExercises.find(exercise => exercise.id === exId));
  }

  exitExercise() {
    this.exerciseResult$.next('cancelled');
  }

  completeExercise() {
    this.exerciseResult$.next('completed');
  }

  get availableExercises(): Observable<Exercise[]> {
    return of([...this._availableExercises]);
  }
}
