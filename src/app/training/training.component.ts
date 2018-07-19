import {Component, OnInit} from '@angular/core';
import {TrainingService} from './service/training.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  ongoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.ongoingTraining$ = this.trainingService.runningExercise$.pipe(
      map(exercise => !!exercise)
    );
  }
}
