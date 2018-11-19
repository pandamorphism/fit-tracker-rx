import {Injectable} from '@angular/core';
import {ActionedExercise, Exercise, ExerciseActionResult} from '../model/exercise';
import {Observable, Subject} from 'rxjs';
import {tag} from 'rxjs-spy/operators';
import {first, map, scan, shareReplay, tap, withLatestFrom} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private _availableExercises$: Observable<Exercise[]>;
  private runningExercise: Subject<Exercise> = new Subject();
  private selectExercise$: Subject<string> = new Subject();
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

  constructor(private db: AngularFirestore) {
    this._availableExercises$ = this.db.collection<Exercise>('availableExercises').valueChanges().pipe(
      shareReplay(1)
    );
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

    this.selectExercise$.pipe(
      withLatestFrom(this.availableExercises$),
      map(([id, exercises]) => exercises.find(exercise => exercise.name === id)),
      tap(exercise => this.runningExercise.next(exercise))
    ).subscribe();
  }

  startExercise(exId: string) {
    this.selectExercise$.next(exId);
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

  get availableExercises$(): Observable<Exercise[]> {
    return this._availableExercises$;
  }
}
