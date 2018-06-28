import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent],
  exports: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ]
})
export class TrainingModule {
}
