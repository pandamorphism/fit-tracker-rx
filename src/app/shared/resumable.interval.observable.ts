import {interval, NEVER, Observable} from 'rxjs';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';

export const debugObs = tag => ({
  next: val => console.log('nexting %O ---> %O', tag, val),
  error: error => console.error(error),
  complete: () => console.log('%O completed!', tag)
});
export type TimerCommand = 'pause' | 'resume' | 'reset';
export const resumableInterval: (period: number, seed?: number) => (commands$: Observable<TimerCommand>) => Observable<number> =
  (period, seed = 0) => commands$ => Observable.create(observer => {
    let counter = seed;
    const source$ = commands$.pipe(startWith('resume'));
    const interval$ = interval(period);
    const pauseResumeSubscription = source$.pipe(
      filter(command => command === 'pause' || command === 'resume'),
      switchMap(command => command === 'pause' ? NEVER : interval$),
      tap(_ => observer.next(counter++))
    ).subscribe();
    const resetSub = source$.pipe(
      filter(command => command === 'reset'),
      tap(_ => counter = 0),
      tap(_ => observer.next(counter++))
    ).subscribe();
    return () => {
      pauseResumeSubscription.unsubscribe();
      resetSub.unsubscribe();
    };
  });
