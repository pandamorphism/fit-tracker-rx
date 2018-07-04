import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil, takeWhile, tap} from 'rxjs/operators';
import {resumableInterval, TimerCommand} from '../../shared/resumable.interval.observable';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training/stop-training.component';

export const multiplier: (mult: number) => (val: number) => number = mult => num => num * mult;
export const lte: (comparable: number) => (val: number) => boolean = comparable => val => val <= comparable;

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingExit = new EventEmitter<void>();
  progress$: Observable<number>;
  destroyed$: Subject<void> = new Subject();
  timerCommands$: Subject<TimerCommand> = new Subject();

  constructor(private dialog: MatDialog) {

  }

  ngOnInit() {
    this.progress$ = resumableInterval(1000, 1)(this.timerCommands$.asObservable()).pipe(
      map(multiplier(5)),
      takeWhile(lte(100)),
      takeUntil(this.destroyed$),
      shareReplay(),
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
      tap(giveUp => giveUp && this.trainingExit.emit() || this.timerCommands$.next('resume'))
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    this.timerCommands$.complete();
  }
}
