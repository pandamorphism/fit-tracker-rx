import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {tap} from 'rxjs/operators';
import {ActionedExercise} from '../../model/exercise';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sorting: MatSort;
  dataSource = new MatTableDataSource<ActionedExercise>();
  displayedColumns = ['actionTime', 'name', 'calories', 'duration', 'remainingProgress', 'state'];
  dataSourceSubscription: Subscription;

  constructor(public trainingService: TrainingService) {
    this.dataSourceSubscription = this.trainingService.completedOrCancelledExercises$.pipe(
      tap(data => this.dataSource.data = data)
    )
      .subscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sorting;
  }

  ngOnDestroy(): void {
    if (this.dataSourceSubscription) {
      this.dataSourceSubscription.unsubscribe();
    }
  }

  doFilter(value: any) {
    console.log('filtering... %O', value);
  }
}
