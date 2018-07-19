import {Component, OnDestroy, OnInit} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil, tap, withLatestFrom} from 'rxjs/operators';
import {resumableInterval, TimerCommand} from '../../../shared/resumable.interval.observable';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training/stop-training.component';
import {TrainingService} from '../../service/training.service';
import {tag} from 'rxjs-spy/operators';

export const multiplier: (mult: number) => (val: number) => number = mult => num => num * mult;

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  progress$: Observable<number>;
  destroyed$: Subject<void> = new Subject();
  completed$: Subject<void> = new Subject();
  timerCommands$: Subject<TimerCommand> = new Subject();

  constructor(private dialog: MatDialog, public trainingService: TrainingService) {

  }

  ngOnInit() {
    this.progress$ = resumableInterval(1000, 1)(this.timerCommands$.asObservable()).pipe(
      withLatestFrom(this.trainingService.runningExercise$),
      map(([tick, exerciseInfo]) => multiplier(100 / exerciseInfo.duration)(tick)),
      tag('progress'),
      takeUntil(merge(this.destroyed$, this.completed$)),
      tap(percent => percent > 100 && this.onComplete()),
      shareReplay(1),
    );
  }

  maybeGiveUp() {
    this.timerCommands$.next('pause');
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress$: this.progress$
      }
    });

    dialogRef.afterClosed().pipe(
      tap(giveUp => giveUp && this.trainingService.exitExercise() || this.timerCommands$.next('resume'))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.timerCommands$.complete();
  }

  private onComplete() {
    this.completed$.next();
    this.trainingService.completeExercise();
  }
}
