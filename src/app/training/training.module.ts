import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CurrentTrainingComponent} from './view/current-training/current-training.component';
import {NewTrainingComponent} from './view/new-training/new-training.component';
import {PastTrainingsComponent} from './view/past-trainings/past-trainings.component';
import {TrainingComponent} from './training.component';
import {MaterialModule} from '../material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StopTrainingComponent} from './view/current-training/stop-training/stop-training.component';
import {TrainingService} from './service/training.service';
import {FormsModule} from '@angular/forms';
import {FloorPipe} from './service/floor.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent,
    FloorPipe
  ],
  providers: [TrainingService],
  entryComponents: [StopTrainingComponent],
  exports: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ]
})
export class TrainingModule {
}
