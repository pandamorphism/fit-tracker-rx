import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../../service/training.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(public trainingService: TrainingService) {
  }

  startExercise(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }

  ngOnInit() {
  }
}
