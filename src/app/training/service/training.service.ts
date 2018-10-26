import {Injectable} from '@angular/core';
import {ActionedExercise, Exercise, ExerciseActionResult} from '../model/exercise';
import {Observable, of, Subject} from 'rxjs';
import {tag} from 'rxjs-spy/operators';
import {first, scan, shareReplay, tap, withLatestFrom} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burepees', duration: 60, calories: 8},
  ];
  private runningExercise: Subject<Exercise> = new Subject();
  private completedOrCancelledExercises: Subject<ActionedExercise> = new Subject();

  completedOrCancelledExercises$: Observable<ActionedExercise[]> = this.completedOrCancelledExercises.asObservable().pipe(
    scan((acc, current: ActionedExercise) => [...acc, current], []),
    tag('completedEx'),
    shareReplay(1)
  );

  runningExercise$: Observable<Exercise> = this.runningExercise.asObservable().pipe(
    tag('runningExercise'),
    shareReplay(1)
  );

  exerciseResult$: Subject<ExerciseActionResult> = new Subject();

  constructor() {
    this.completedOrCancelledExercises$.subscribe();
    this.exerciseResult$.pipe(
      withLatestFrom(this.runningExercise),
      tap(([result, exercise]) => {
        switch (result.type) {
          case 'completed' :
            this.completedOrCancelledExercises.next({...exercise, actionTime: Date.now(), state: 'completed'});
            break;
          case 'cancelled' :
            this.completedOrCancelledExercises.next({
              ...exercise,
              calories: Math.floor(exercise.calories / 100 * result.progress),
              remainingProgress: Math.round(100 - result.progress),
              actionTime: Date.now(),
              state: 'cancelled'
            });
            break;
        }
      }),
      tap(() => this.runningExercise.next(null))
    ).subscribe();
  }

  startExercise(exId: string) {
    this.runningExercise.next(this._availableExercises.find(exercise => exercise.id === exId));
  }

  exitExercise(progress$: Observable<number>) {
    progress$.pipe(
      tap(progress => this.exerciseResult$.next({type: 'cancelled', progress})),
      first()
    ).subscribe();
  }

  completeExercise() {
    this.exerciseResult$.next({type: 'completed'});
  }

  get availableExercises(): Observable<Exercise[]> {
    return of([...this._availableExercises]);
  }
}
